import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Season } from '@/app/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  console.log('🌱 Starting massive seed...');

  // Clean existing data in correct order
  await prisma.favoriteAccommodation.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.house.deleteMany();
  await prisma.accommodation.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.activityType.deleteMany();
  await prisma.address.deleteMany();
  await prisma.currency.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned existing data');

  // Hash passwords
  const passwords = {
    admin: await hashPassword('Admin@2024!'),
    manager: await hashPassword('Manager@2024!'),
    editor: await hashPassword('Editor@2024!'),
    guest1: await hashPassword('EmmaTravel2024!'),
    guest2: await hashPassword('JamesAdventure2024!'),
    guest3: await hashPassword('SofiaExplore2024!'),
    guest4: await hashPassword('LucasWander2024!'),
    guest5: await hashPassword('OliviaJourney2024!'),
    guest6: await hashPassword('NoahDiscover2024!'),
    guest7: await hashPassword('AvaVoyage2024!'),
    guest8: await hashPassword('EthanTrek2024!'),
    guest9: await hashPassword('MiaRoam2024!'),
    guest10: await hashPassword('AlexPlorer2024!'),
  };

  // Create Users
  // Password: Admin@2024!
  const adminUser = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: 'System Administrator',
      email: 'admin@travelhub.com',
      username: 'admin',
      role: 'Admin',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      password: passwords.admin,
    },
  });

  // Password: Manager@2024!
  const contentManager = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: 'Michael Chen',
      email: 'michael.chen@travelhub.com',
      username: 'michael_cm',
      role: 'ContentManager',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      password: passwords.manager,
    },
  });

  // Password: Editor@2024!
  const editor = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: 'Isabella Rossi',
      email: 'isabella.rossi@travelhub.com',
      username: 'isabella_editor',
      role: 'Editor',
      image: 'https://randomuser.me/api/portraits/women/7.jpg',
      password: passwords.editor,
    },
  });

  // Create 10 guest users
  const guestUsers = await Promise.all([
    // Password: EmmaTravel2024!
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Emma Williams',
        email: 'emma.williams@email.com',
        username: 'emma_w',
        role: 'Guest',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        password: passwords.guest1,
      },
    }),
    // Password: JamesAdventure2024!
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'James Rodriguez',
        email: 'james.rodriguez@email.com',
        username: 'james_r',
        role: 'Guest',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        password: passwords.guest2,
      },
    }),
    // Password: SofiaExplore2024!
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Sofia Martinez',
        email: 'sofia.martinez@email.com',
        username: 'sofia_m',
        role: 'Guest',
        image: 'https://randomuser.me/api/portraits/women/5.jpg',
        password: passwords.guest3,
      },
    }),
    // Password: LucasWander2024!
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Lucas Anderson',
        email: 'lucas.anderson@email.com',
        username: 'lucas_a',
        role: 'Guest',
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        password: passwords.guest4,
      },
    }),
    // Password: OliviaJourney2024!
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Olivia Taylor',
        email: 'olivia.taylor@email.com',
        username: 'olivia_t',
        role: 'Guest',
        image: 'https://randomuser.me/api/portraits/women/8.jpg',
        password: passwords.guest5,
      },
    }),
    // Password: NoahDiscover2024!
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Noah Brown',
        email: 'noah.brown@email.com',
        username: 'noah_b',
        role: 'Guest',
        image: 'https://randomuser.me/api/portraits/men/9.jpg',
        password: passwords.guest6,
      },
    }),
    // Password: AvaVoyage2024!
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Ava Garcia',
        email: 'ava.garcia@email.com',
        username: 'ava_g',
        role: 'Guest',
        image: 'https://randomuser.me/api/portraits/women/10.jpg',
        password: passwords.guest7,
      },
    }),
    // Password: EthanTrek2024!
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Ethan Wilson',
        email: 'ethan.wilson@email.com',
        username: 'ethan_w',
        role: 'Guest',
        image: 'https://randomuser.me/api/portraits/men/11.jpg',
        password: passwords.guest8,
      },
    }),
    // Password: MiaRoam2024!
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Mia Thompson',
        email: 'mia.thompson@email.com',
        username: 'mia_t',
        role: 'Guest',
        image: 'https://randomuser.me/api/portraits/women/12.jpg',
        password: passwords.guest9,
      },
    }),
    // Password: AlexPlorer2024!
    prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Alexander Lee',
        email: 'alex.lee@email.com',
        username: 'alex_l',
        role: 'Guest',
        image: 'https://randomuser.me/api/portraits/men/13.jpg',
        password: passwords.guest10,
      },
    }),
  ]);

  console.log('✅ Created 13 users');

  // Create Currencies (15 currencies)
  const currencies = await Promise.all([
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'US Dollar',
        symbol: '$',
        isoCode: 'USD',
        isActive: true,
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'Euro',
        symbol: '€',
        isoCode: 'EUR',
        isActive: true,
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'British Pound',
        symbol: '£',
        isoCode: 'GBP',
        isActive: true,
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'Japanese Yen',
        symbol: '¥',
        isoCode: 'JPY',
        isActive: true,
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'Swiss Franc',
        symbol: 'Fr',
        isoCode: 'CHF',
        isActive: true,
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'Canadian Dollar',
        symbol: 'C$',
        isoCode: 'CAD',
        isActive: true,
        createdById: contentManager.id,
        updatedById: contentManager.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'Australian Dollar',
        symbol: 'A$',
        isoCode: 'AUD',
        isActive: true,
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'Brazilian Real',
        symbol: 'R$',
        isoCode: 'BRL',
        isActive: true,
        createdById: contentManager.id,
        updatedById: contentManager.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'Indian Rupee',
        symbol: '₹',
        isoCode: 'INR',
        isActive: true,
        createdById: editor.id,
        updatedById: editor.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'Thai Baht',
        symbol: '฿',
        isoCode: 'THB',
        isActive: true,
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'Mexican Peso',
        symbol: 'Mex$',
        isoCode: 'MXN',
        isActive: true,
        createdById: contentManager.id,
        updatedById: contentManager.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'UAE Dirham',
        symbol: 'د.إ',
        isoCode: 'AED',
        isActive: true,
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'South Korean Won',
        symbol: '₩',
        isoCode: 'KRW',
        isActive: true,
        createdById: editor.id,
        updatedById: editor.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'Turkish Lira',
        symbol: '₺',
        isoCode: 'TRY',
        isActive: true,
        createdById: contentManager.id,
        updatedById: contentManager.id,
      },
    }),
    prisma.currency.create({
      data: {
        id: crypto.randomUUID(),
        title: 'South African Rand',
        symbol: 'R',
        isoCode: 'ZAR',
        isActive: true,
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    }),
  ]);

  const [usd, eur, gbp, jpy, chf, cad, aud, brl, inr, thb, mxn, aed, krw, try_, zar] = currencies;

  console.log('✅ Created 15 currencies');

  // Create Activity Types (15 types)
  const activityTypes = await Promise.all([
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Sightseeing',
        title: 'Sightseeing Tours',
        emoji: '🏛️',
        icon: 'IconBuildingMonument',
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'OutdoorAdventure',
        title: 'Outdoor Adventures',
        emoji: '🏔️',
        icon: 'IconMountain',
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'FoodWine',
        title: 'Food & Wine Experiences',
        emoji: '🍷',
        icon: 'IconGlassFull',
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'CulturalExperience',
        title: 'Cultural Experiences',
        emoji: '🎭',
        icon: 'IconConfetti',
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'WaterSports',
        title: 'Water Sports',
        emoji: '🏄',
        icon: 'IconWind',
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Wellness',
        title: 'Wellness & Spa',
        emoji: '🧘',
        icon: 'IconHeart',
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Nightlife',
        title: 'Nightlife & Entertainment',
        emoji: '🌃',
        icon: 'IconSparkles',
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Shopping',
        title: 'Shopping Tours',
        emoji: '🛍️',
        icon: 'IconShoppingBag',
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'Photography',
        title: 'Photography Tours',
        emoji: '📸',
        icon: 'IconCamera',
        isActive: true,
        createdById: editor.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'WildlifeSafari',
        title: 'Wildlife Safaris',
        emoji: '🦁',
        icon: 'IconBinoculars',
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'HistoricalTours',
        title: 'Historical Tours',
        emoji: '🏰',
        icon: 'IconBuildingCastle',
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'ArtMuseums',
        title: 'Art & Museums',
        emoji: '🎨',
        icon: 'IconPalette',
        isActive: true,
        createdById: editor.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'ExtremeSports',
        title: 'Extreme Sports',
        emoji: '🪂',
        icon: 'IconParachute',
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'BoatCruises',
        title: 'Boat Cruises',
        emoji: '⛵',
        icon: 'IconShip',
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.activityType.create({
      data: {
        id: crypto.randomUUID(),
        name: 'CookingClasses',
        title: 'Cooking Classes',
        emoji: '👨‍🍳',
        icon: 'IconToolsKitchen2',
        isActive: true,
        createdById: editor.id,
      },
    }),
  ]);

  const [
    sightseeing,
    outdoorAdventure,
    foodWine,
    culturalExperience,
    waterSports,
    wellness,
    nightlife,
    shopping,
    photography,
    wildlifeSafari,
    historicalTours,
    artMuseums,
    extremeSports,
    boatCruises,
    cookingClasses,
  ] = activityTypes;

  console.log('✅ Created 15 activity types');

  // Create Destinations (30 destinations, mostly single season)
  const destinations = await Promise.all([
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Paris',
        country: 'France',
        slogan: 'The City of Light',
        seasons: [Season.SPRING],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Tokyo',
        country: 'Japan',
        slogan: 'Where Tradition Meets Innovation',
        seasons: [Season.SPRING],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Barcelona',
        country: 'Spain',
        slogan: 'Mediterranean Magic',
        seasons: [Season.SUMMER],
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Zurich',
        country: 'Switzerland',
        slogan: 'Alpine Elegance',
        seasons: [Season.WINTER],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'London',
        country: 'United Kingdom',
        slogan: 'The Royal Experience',
        seasons: [Season.AUTUMN],
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Rome',
        country: 'Italy',
        slogan: 'The Eternal City',
        seasons: [Season.SPRING],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Vancouver',
        country: 'Canada',
        slogan: 'Where Mountains Meet the Sea',
        seasons: [Season.SUMMER],
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Sydney',
        country: 'Australia',
        slogan: 'Harbour City Paradise',
        seasons: [Season.SUMMER],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Dubai',
        country: 'UAE',
        slogan: 'City of Gold',
        seasons: [Season.WINTER],
        isActive: true,
        createdById: editor.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Bangkok',
        country: 'Thailand',
        slogan: 'Land of Smiles',
        seasons: [Season.SUMMER],
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Rio de Janeiro',
        country: 'Brazil',
        slogan: 'Cidade Maravilhosa',
        seasons: [Season.SUMMER],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Cape Town',
        country: 'South Africa',
        slogan: 'The Mother City',
        seasons: [Season.SPRING],
        isActive: true,
        createdById: editor.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'New York',
        country: 'USA',
        slogan: 'The Big Apple',
        seasons: [Season.AUTUMN],
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Marrakech',
        country: 'Morocco',
        slogan: 'The Red City',
        seasons: [Season.SPRING],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Queenstown',
        country: 'New Zealand',
        slogan: 'Adventure Capital',
        seasons: [Season.WINTER],
        isActive: true,
        createdById: editor.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Amsterdam',
        country: 'Netherlands',
        slogan: 'Venice of the North',
        seasons: [Season.SPRING],
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Bali',
        country: 'Indonesia',
        slogan: 'Island of Gods',
        seasons: [Season.SUMMER],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Prague',
        country: 'Czech Republic',
        slogan: 'City of a Hundred Spires',
        seasons: [Season.SPRING],
        isActive: true,
        createdById: editor.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Maldives',
        country: 'Maldives',
        slogan: 'Paradise on Earth',
        seasons: [Season.SUMMER, Season.WINTER],
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Seoul',
        country: 'South Korea',
        slogan: 'Soul of Asia',
        seasons: [Season.AUTUMN],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Mexico City',
        country: 'Mexico',
        slogan: 'Heart of Mexico',
        seasons: [Season.SPRING],
        isActive: true,
        createdById: editor.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Lisbon',
        country: 'Portugal',
        slogan: 'City of Seven Hills',
        seasons: [Season.SUMMER],
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Helsinki',
        country: 'Finland',
        slogan: 'Daughter of the Baltic',
        seasons: [Season.WINTER],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Santorini',
        country: 'Greece',
        slogan: 'Jewel of the Aegean',
        seasons: [Season.SUMMER],
        isActive: true,
        createdById: editor.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Istanbul',
        country: 'Turkey',
        slogan: 'Where East Meets West',
        seasons: [Season.SPRING, Season.AUTUMN],
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Copenhagen',
        country: 'Denmark',
        slogan: 'City of Fairy Tales',
        seasons: [Season.SUMMER],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Havana',
        country: 'Cuba',
        slogan: 'Pearl of the Caribbean',
        seasons: [Season.SUMMER],
        isActive: true,
        createdById: editor.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Reykjavik',
        country: 'Iceland',
        slogan: 'Land of Fire and Ice',
        seasons: [Season.WINTER],
        isActive: true,
        createdById: contentManager.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Mumbai',
        country: 'India',
        slogan: 'City of Dreams',
        seasons: [Season.AUTUMN],
        isActive: true,
        createdById: adminUser.id,
      },
    }),
    prisma.destination.create({
      data: {
        id: crypto.randomUUID(),
        city: 'Vienna',
        country: 'Austria',
        slogan: 'City of Music',
        seasons: [Season.SPRING],
        isActive: true,
        createdById: editor.id,
      },
    }),
  ]);

  const [
    paris,
    tokyo,
    barcelona,
    zurich,
    london,
    rome,
    vancouver,
    sydney,
    dubai,
    bangkok,
    rio,
    capeTown,
    newYork,
    marrakech,
    queenstown,
    amsterdam,
    bali,
    prague,
    maldives,
    seoul,
    mexicoCity,
    lisbon,
    helsinki,
    santorini,
    istanbul,
    copenhagen,
    havana,
    reykjavik,
    mumbai,
    vienna,
  ] = destinations;

  console.log('✅ Created 30 destinations');

  // Create Addresses (50+ addresses)
  const addresses = await Promise.all([
    // Paris
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'France',
        countryCode: 'FR',
        city: 'Paris',
        details: 'Champ de Mars, 5 Avenue Anatole, 75007',
        latitude: 48.8584,
        longitude: 2.2945,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'France',
        countryCode: 'FR',
        city: 'Paris',
        details: 'Rue de Rivoli, 75001',
        latitude: 48.8606,
        longitude: 2.3376,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'France',
        countryCode: 'FR',
        city: 'Paris',
        details: '31 Avenue George V, 75008',
        latitude: 48.8698,
        longitude: 2.3005,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'France',
        countryCode: 'FR',
        city: 'Paris',
        details: 'Place de la Concorde, 75008',
        latitude: 48.8656,
        longitude: 2.3212,
        createdById: editor.id,
      },
    }),
    // Tokyo
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Japan',
        countryCode: 'JP',
        city: 'Tokyo',
        details: '2 Chome-21-1 Shibuya, Shibuya City',
        latitude: 35.6595,
        longitude: 139.7004,
        createdById: contentManager.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Japan',
        countryCode: 'JP',
        city: 'Tokyo',
        details: '1-12-2 Nishi-Shinjuku, Shinjuku City',
        latitude: 35.6895,
        longitude: 139.6987,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Japan',
        countryCode: 'JP',
        city: 'Tokyo',
        details: '9-7-1 Akasaka, Minato City',
        latitude: 35.6721,
        longitude: 139.7367,
        createdById: contentManager.id,
      },
    }),
    // Barcelona
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Spain',
        countryCode: 'ES',
        city: 'Barcelona',
        details: 'Carrer de Mallorca, 401, 08013',
        latitude: 41.4036,
        longitude: 2.1744,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Spain',
        countryCode: 'ES',
        city: 'Barcelona',
        details: "Carrer d'Olot, s/n, 08024",
        latitude: 41.4145,
        longitude: 2.1527,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Spain',
        countryCode: 'ES',
        city: 'Barcelona',
        details: 'Passeig de Gràcia, 43, 08007',
        latitude: 41.3918,
        longitude: 2.165,
        createdById: contentManager.id,
      },
    }),
    // Zurich
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Switzerland',
        countryCode: 'CH',
        city: 'Zurich',
        details: 'Bahnhofstrasse 15, 8001',
        latitude: 47.3695,
        longitude: 8.5394,
        createdById: contentManager.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Switzerland',
        countryCode: 'CH',
        city: 'Zurich',
        details: 'Rennweg 7, 8001',
        latitude: 47.3731,
        longitude: 8.5401,
        createdById: editor.id,
      },
    }),
    // London
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'United Kingdom',
        countryCode: 'GB',
        city: 'London',
        details: 'Buckingham Palace, London SW1A 1AA',
        latitude: 51.5014,
        longitude: -0.1419,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'United Kingdom',
        countryCode: 'GB',
        city: 'London',
        details: '10 Downing Street, London SW1A 2AA',
        latitude: 51.5034,
        longitude: -0.1276,
        createdById: contentManager.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'United Kingdom',
        countryCode: 'GB',
        city: 'London',
        details: '221B Baker Street, London NW1 6XE',
        latitude: 51.5237,
        longitude: -0.1585,
        createdById: editor.id,
      },
    }),
    // Rome
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Italy',
        countryCode: 'IT',
        city: 'Rome',
        details: 'Piazza del Colosseo, 1, 00184',
        latitude: 41.8902,
        longitude: 12.4922,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Italy',
        countryCode: 'IT',
        city: 'Rome',
        details: 'Via della Conciliazione 33, 00193',
        latitude: 41.9028,
        longitude: 12.4652,
        createdById: contentManager.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Italy',
        countryCode: 'IT',
        city: 'Rome',
        details: 'Piazza di Spagna, 00187',
        latitude: 41.906,
        longitude: 12.4824,
        createdById: editor.id,
      },
    }),
    // Vancouver
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Canada',
        countryCode: 'CA',
        city: 'Vancouver',
        details: '999 Canada Pl, Vancouver, BC V6C 3T4',
        latitude: 49.2886,
        longitude: -123.1111,
        createdById: contentManager.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Canada',
        countryCode: 'CA',
        city: 'Vancouver',
        details: '2099 Beach Ave, Vancouver, BC V6G 1Z4',
        latitude: 49.273,
        longitude: -123.1445,
        createdById: editor.id,
      },
    }),
    // Sydney
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Australia',
        countryCode: 'AU',
        city: 'Sydney',
        details: 'Bennelong Point, Sydney NSW 2000',
        latitude: -33.8568,
        longitude: 151.2153,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Australia',
        countryCode: 'AU',
        city: 'Sydney',
        details: '1 Darling Dr, Sydney NSW 2000',
        latitude: -33.872,
        longitude: 151.1987,
        createdById: contentManager.id,
      },
    }),
    // Dubai
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'UAE',
        countryCode: 'AE',
        city: 'Dubai',
        details: '1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
        latitude: 25.1972,
        longitude: 55.2744,
        createdById: editor.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'UAE',
        countryCode: 'AE',
        city: 'Dubai',
        details: 'Jumeirah Beach Road, Umm Suqeim 3',
        latitude: 25.1415,
        longitude: 55.1854,
        createdById: adminUser.id,
      },
    }),
    // Bangkok
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Thailand',
        countryCode: 'TH',
        city: 'Bangkok',
        details: 'Grand Palace, Na Phra Lan Rd, Phra Borom Maha Ratchawang',
        latitude: 13.75,
        longitude: 100.4914,
        createdById: contentManager.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Thailand',
        countryCode: 'TH',
        city: 'Bangkok',
        details: '8 Soi Sukhumvit 55, Khlong Tan Nuea, Watthana',
        latitude: 13.7367,
        longitude: 100.5864,
        createdById: editor.id,
      },
    }),
    // Rio
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Brazil',
        countryCode: 'BR',
        city: 'Rio de Janeiro',
        details: 'Parque Nacional da Tijuca, Alto da Boa Vista',
        latitude: -22.9519,
        longitude: -43.2105,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Brazil',
        countryCode: 'BR',
        city: 'Rio de Janeiro',
        details: 'Av. Atlântica, 1702, Copacabana',
        latitude: -22.9705,
        longitude: -43.1819,
        createdById: contentManager.id,
      },
    }),
    // Cape Town
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'South Africa',
        countryCode: 'ZA',
        city: 'Cape Town',
        details: 'Table Mountain, Tafelberg Rd, Gardens',
        latitude: -33.9628,
        longitude: 18.4098,
        createdById: editor.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'South Africa',
        countryCode: 'ZA',
        city: 'Cape Town',
        details: 'Victoria & Alfred Waterfront, 8001',
        latitude: -33.9036,
        longitude: 18.4211,
        createdById: adminUser.id,
      },
    }),
    // New York
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'USA',
        countryCode: 'US',
        city: 'New York',
        details: '350 5th Ave, New York, NY 10118',
        latitude: 40.7484,
        longitude: -73.9857,
        createdById: contentManager.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'USA',
        countryCode: 'US',
        city: 'New York',
        details: '20 W 34th St, New York, NY 10001',
        latitude: 40.7484,
        longitude: -73.9856,
        createdById: editor.id,
      },
    }),
    // Marrakech
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Morocco',
        countryCode: 'MA',
        city: 'Marrakech',
        details: 'Jemaa el-Fnaa, Medina',
        latitude: 31.6258,
        longitude: -7.9891,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Morocco',
        countryCode: 'MA',
        city: 'Marrakech',
        details: 'Rue Souk Semarine, Medina',
        latitude: 31.6319,
        longitude: -7.9865,
        createdById: contentManager.id,
      },
    }),
    // Queenstown
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'New Zealand',
        countryCode: 'NZ',
        city: 'Queenstown',
        details: 'Shotover St, Queenstown 9300',
        latitude: -45.0312,
        longitude: 168.6626,
        createdById: editor.id,
      },
    }),
    // Amsterdam
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Netherlands',
        countryCode: 'NL',
        city: 'Amsterdam',
        details: 'Museumplein 6, 1071 DJ',
        latitude: 52.36,
        longitude: 4.8852,
        createdById: adminUser.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Netherlands',
        countryCode: 'NL',
        city: 'Amsterdam',
        details: 'Damrak 66, 1012 LM',
        latitude: 52.3764,
        longitude: 4.8974,
        createdById: contentManager.id,
      },
    }),
    // Bali
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Indonesia',
        countryCode: 'ID',
        city: 'Bali',
        details: 'Jl. Raya Ubud, Ubud, Gianyar',
        latitude: -8.5069,
        longitude: 115.2625,
        createdById: editor.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Indonesia',
        countryCode: 'ID',
        city: 'Bali',
        details: 'Jl. Pantai Kuta, Kuta, Badung',
        latitude: -8.7187,
        longitude: 115.1686,
        createdById: adminUser.id,
      },
    }),
    // Prague
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Czech Republic',
        countryCode: 'CZ',
        city: 'Prague',
        details: 'Pražský hrad, 119 08 Prague 1',
        latitude: 50.0902,
        longitude: 14.4012,
        createdById: contentManager.id,
      },
    }),
    // Maldives
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Maldives',
        countryCode: 'MV',
        city: 'Maldives',
        details: 'North Malé Atoll, 20026',
        latitude: 4.1755,
        longitude: 73.5093,
        createdById: adminUser.id,
      },
    }),
    // Seoul
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'South Korea',
        countryCode: 'KR',
        city: 'Seoul',
        details: '105 Namsangongwon-gil, Yongsan-gu',
        latitude: 37.5512,
        longitude: 126.9882,
        createdById: editor.id,
      },
    }),
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'South Korea',
        countryCode: 'KR',
        city: 'Seoul',
        details: '161 Sajik-ro, Jongno-gu',
        latitude: 37.5796,
        longitude: 126.977,
        createdById: contentManager.id,
      },
    }),
    // Mexico City
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Mexico',
        countryCode: 'MX',
        city: 'Mexico City',
        details: 'P.º de la Reforma s/n, Polanco',
        latitude: 19.4326,
        longitude: -99.1332,
        createdById: adminUser.id,
      },
    }),
    // Lisbon
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Portugal',
        countryCode: 'PT',
        city: 'Lisbon',
        details: 'Av. da Liberdade 180, 1250-146',
        latitude: 38.7217,
        longitude: -9.1458,
        createdById: editor.id,
      },
    }),
    // Helsinki
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Finland',
        countryCode: 'FI',
        city: 'Helsinki',
        details: 'Suomenlinna, 00190 Helsinki',
        latitude: 60.1473,
        longitude: 24.9879,
        createdById: contentManager.id,
      },
    }),
    // Santorini
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Greece',
        countryCode: 'GR',
        city: 'Santorini',
        details: 'Oia, 847 02',
        latitude: 36.4618,
        longitude: 25.3753,
        createdById: adminUser.id,
      },
    }),
    // Istanbul
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Turkey',
        countryCode: 'TR',
        city: 'Istanbul',
        details: 'Sultan Ahmet Mahallesi, Atmeydanı Cd. No:1, 34122 Fatih',
        latitude: 41.0054,
        longitude: 28.9768,
        createdById: editor.id,
      },
    }),
    // Copenhagen
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Denmark',
        countryCode: 'DK',
        city: 'Copenhagen',
        details: 'Langelinie, 2100 København Ø',
        latitude: 55.6929,
        longitude: 12.5993,
        createdById: contentManager.id,
      },
    }),
    // Reykjavik
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Iceland',
        countryCode: 'IS',
        city: 'Reykjavik',
        details: 'Hallgrímstorg 1, 101 Reykjavík',
        latitude: 64.142,
        longitude: -21.9271,
        createdById: adminUser.id,
      },
    }),
    // Mumbai
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'India',
        countryCode: 'IN',
        city: 'Mumbai',
        details: 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
        latitude: 18.9217,
        longitude: 72.8332,
        createdById: editor.id,
      },
    }),
    // Vienna
    prisma.address.create({
      data: {
        id: crypto.randomUUID(),
        country: 'Austria',
        countryCode: 'AT',
        city: 'Vienna',
        details: 'Schönbrunner Schloßstraße 47, 1130',
        latitude: 48.1845,
        longitude: 16.3122,
        createdById: contentManager.id,
      },
    }),
  ]);

  const [
    eiffelTowerAddr,
    louvreAddr,
    hotelParisAddr,
    concordeAddr,
    shibuyaAddr,
    shinjukuAddr,
    akasakaAddr,
    sagradaAddr,
    parkGuellAddr,
    passeigGraciaAddr,
    zurichOldAddr,
    zurichRennwegAddr,
    buckinghamAddr,
    downingStreetAddr,
    bakerStreetAddr,
    colosseumAddr,
    villaTuscanyAddr,
    spanishStepsAddr,
    vancouverAddr,
    vancouverBeachAddr,
    sydneyOperaAddr,
    sydneyDarlingAddr,
    dubaiBurjAddr,
    dubaiBeachAddr,
    bangkokPalaceAddr,
    bangkokSukhumvitAddr,
    rioChristAddr,
    rioCopacabanaAddr,
    capeTownTableAddr,
    capeTownWaterfrontAddr,
    newYorkEmpireAddr,
    newYorkLibertyAddr,
    marrakechJemaaAddr,
    marrakechSoukAddr,
    queenstownAddr,
    amsterdamMuseumAddr,
    amsterdamDamAddr,
    baliUbudAddr,
    baliKutaAddr,
    pragueCastleAddr,
    maldivesAtollAddr,
    seoulTowerAddr,
    seoulPalaceAddr,
    mexicoCityReformaAddr,
    lisbonLiberdadeAddr,
    helsinkiSuomenlinnaAddr,
    santoriniOiaAddr,
    istanbulSultanAddr,
    copenhagenMermaidAddr,
    reykjavikChurchAddr,
    mumbaiGatewayAddr,
    viennaSchonbrunnAddr,
  ] = addresses;

  console.log('✅ Created 50+ addresses');

  // Create Activities (60+ activities across all destinations)
  const activitiesData = [
    // Paris Activities
    {
      title: 'Eiffel Tower Summit Priority Access',
      price: 65.0,
      discount: 10.0,
      currencyId: eur.id,
      addressId: eiffelTowerAddr.id,
      activityTypeId: sightseeing.id,
      createdById: adminUser.id,
    },
    {
      title: 'Louvre Museum Skip-the-Line Tour',
      price: 75.0,
      currencyId: eur.id,
      addressId: louvreAddr.id,
      activityTypeId: artMuseums.id,
      createdById: contentManager.id,
    },
    {
      title: 'Seine River Gourmet Dinner Cruise',
      price: 140.0,
      discount: 20.0,
      currencyId: eur.id,
      addressId: eiffelTowerAddr.id,
      activityTypeId: boatCruises.id,
      createdById: adminUser.id,
    },
    {
      title: 'Paris Vintage Shopping Tour in Le Marais',
      price: 55.0,
      currencyId: eur.id,
      addressId: concordeAddr.id,
      activityTypeId: shopping.id,
      createdById: contentManager.id,
    },
    {
      title: 'Paris Photography Walk at Sunrise',
      price: 89.0,
      currencyId: eur.id,
      addressId: concordeAddr.id,
      activityTypeId: photography.id,
      createdById: editor.id,
    },
    {
      title: 'French Pastry Cooking Class',
      price: 120.0,
      currencyId: eur.id,
      addressId: hotelParisAddr.id,
      activityTypeId: cookingClasses.id,
      createdById: adminUser.id,
    },
    // Tokyo Activities
    {
      title: 'Shibuya Food & Culture Walking Tour',
      price: 8500.0,
      discount: 1000.0,
      currencyId: jpy.id,
      addressId: shibuyaAddr.id,
      activityTypeId: foodWine.id,
      createdById: adminUser.id,
    },
    {
      title: 'Traditional Tea Ceremony in Shinjuku',
      price: 5000.0,
      currencyId: jpy.id,
      addressId: shinjukuAddr.id,
      activityTypeId: culturalExperience.id,
      createdById: contentManager.id,
    },
    {
      title: 'Tokyo Nightlife Experience in Roppongi',
      price: 12000.0,
      currencyId: jpy.id,
      addressId: akasakaAddr.id,
      activityTypeId: nightlife.id,
      createdById: adminUser.id,
    },
    {
      title: 'Tokyo Street Photography Tour',
      price: 7500.0,
      currencyId: jpy.id,
      addressId: shibuyaAddr.id,
      activityTypeId: photography.id,
      createdById: editor.id,
    },
    // Barcelona Activities
    {
      title: 'Sagrada Familia Architecture Tour',
      price: 55.0,
      currencyId: eur.id,
      addressId: sagradaAddr.id,
      activityTypeId: culturalExperience.id,
      createdById: contentManager.id,
    },
    {
      title: 'Park Güell Sunset Experience',
      price: 35.0,
      currencyId: eur.id,
      addressId: parkGuellAddr.id,
      activityTypeId: outdoorAdventure.id,
      createdById: adminUser.id,
    },
    {
      title: 'Barcelona Tapas & Wine Evening Tour',
      price: 75.0,
      currencyId: eur.id,
      addressId: passeigGraciaAddr.id,
      activityTypeId: foodWine.id,
      createdById: contentManager.id,
    },
    {
      title: 'Mediterranean Sailing Experience',
      price: 120.0,
      currencyId: eur.id,
      addressId: parkGuellAddr.id,
      activityTypeId: waterSports.id,
      createdById: adminUser.id,
    },
    // Zurich Activities
    {
      title: 'Zurich Old Town Historical Walking Tour',
      price: 30.0,
      currencyId: chf.id,
      addressId: zurichOldAddr.id,
      activityTypeId: sightseeing.id,
      createdById: contentManager.id,
    },
    {
      title: 'Swiss Alps Full-Day Ski Adventure',
      price: 250.0,
      currencyId: chf.id,
      addressId: zurichRennwegAddr.id,
      activityTypeId: extremeSports.id,
      createdById: adminUser.id,
    },
    {
      title: 'Swiss Chocolate & Cheese Tasting',
      price: 95.0,
      currencyId: chf.id,
      addressId: zurichOldAddr.id,
      activityTypeId: foodWine.id,
      createdById: contentManager.id,
    },
    // London Activities
    {
      title: 'Buckingham Palace State Rooms Tour',
      price: 45.0,
      currencyId: gbp.id,
      addressId: buckinghamAddr.id,
      activityTypeId: sightseeing.id,
      createdById: adminUser.id,
    },
    {
      title: 'West End Theater Night with Dinner',
      price: 150.0,
      currencyId: gbp.id,
      addressId: downingStreetAddr.id,
      activityTypeId: nightlife.id,
      createdById: contentManager.id,
    },
    {
      title: 'Sherlock Holmes Walking Tour',
      price: 35.0,
      currencyId: gbp.id,
      addressId: bakerStreetAddr.id,
      activityTypeId: historicalTours.id,
      createdById: editor.id,
    },
    // Rome Activities
    {
      title: 'Colosseum Night Tour with Underground Access',
      price: 79.0,
      currencyId: eur.id,
      addressId: colosseumAddr.id,
      activityTypeId: historicalTours.id,
      createdById: contentManager.id,
    },
    {
      title: 'Authentic Roman Cooking Class',
      price: 95.0,
      discount: 15.0,
      currencyId: eur.id,
      addressId: villaTuscanyAddr.id,
      activityTypeId: cookingClasses.id,
      createdById: adminUser.id,
    },
    {
      title: 'Vatican Museums & Sistine Chapel VIP Tour',
      price: 110.0,
      currencyId: eur.id,
      addressId: villaTuscanyAddr.id,
      activityTypeId: artMuseums.id,
      createdById: contentManager.id,
    },
    // Vancouver Activities
    {
      title: 'Stanley Park Cycling Tour',
      price: 45.0,
      currencyId: cad.id,
      addressId: vancouverAddr.id,
      activityTypeId: outdoorAdventure.id,
      createdById: adminUser.id,
    },
    {
      title: 'Granville Island Food Market Tour',
      price: 65.0,
      currencyId: cad.id,
      addressId: vancouverBeachAddr.id,
      activityTypeId: foodWine.id,
      createdById: contentManager.id,
    },
    // Sydney Activities
    {
      title: 'Sydney Opera House Backstage Tour',
      price: 175.0,
      currencyId: aud.id,
      addressId: sydneyOperaAddr.id,
      activityTypeId: culturalExperience.id,
      createdById: adminUser.id,
    },
    {
      title: 'Bondi Beach Surfing Lesson',
      price: 70.0,
      currencyId: aud.id,
      addressId: sydneyDarlingAddr.id,
      activityTypeId: waterSports.id,
      createdById: contentManager.id,
    },
    {
      title: 'Sydney Harbour Sunset Cruise',
      price: 95.0,
      currencyId: aud.id,
      addressId: sydneyDarlingAddr.id,
      activityTypeId: boatCruises.id,
      createdById: editor.id,
    },
    // Dubai Activities
    {
      title: 'Burj Khalifa At The Top Experience',
      price: 450.0,
      currencyId: aed.id,
      addressId: dubaiBurjAddr.id,
      activityTypeId: sightseeing.id,
      createdById: adminUser.id,
    },
    {
      title: 'Desert Safari with BBQ Dinner',
      price: 350.0,
      currencyId: aed.id,
      addressId: dubaiBeachAddr.id,
      activityTypeId: outdoorAdventure.id,
      createdById: contentManager.id,
    },
    {
      title: 'Dubai Marina Yacht Dinner Cruise',
      price: 550.0,
      currencyId: aed.id,
      addressId: dubaiBeachAddr.id,
      activityTypeId: boatCruises.id,
      createdById: editor.id,
    },
    // Bangkok Activities
    {
      title: 'Grand Palace & Temples Tour',
      price: 1800.0,
      currencyId: thb.id,
      addressId: bangkokPalaceAddr.id,
      activityTypeId: historicalTours.id,
      createdById: adminUser.id,
    },
    {
      title: 'Bangkok Street Food Tuk-Tuk Tour',
      price: 1500.0,
      currencyId: thb.id,
      addressId: bangkokSukhumvitAddr.id,
      activityTypeId: foodWine.id,
      createdById: contentManager.id,
    },
    // Rio Activities
    {
      title: 'Christ the Redeemer & Sugarloaf Tour',
      price: 280.0,
      currencyId: brl.id,
      addressId: rioChristAddr.id,
      activityTypeId: sightseeing.id,
      createdById: editor.id,
    },
    {
      title: 'Copacabana Beach Volleyball Experience',
      price: 120.0,
      currencyId: brl.id,
      addressId: rioCopacabanaAddr.id,
      activityTypeId: outdoorAdventure.id,
      createdById: adminUser.id,
    },
    // Cape Town Activities
    {
      title: 'Table Mountain Cable Car & Hike',
      price: 850.0,
      currencyId: zar.id,
      addressId: capeTownTableAddr.id,
      activityTypeId: outdoorAdventure.id,
      createdById: contentManager.id,
    },
    {
      title: 'Cape Winelands Tasting Tour',
      price: 1200.0,
      currencyId: zar.id,
      addressId: capeTownWaterfrontAddr.id,
      activityTypeId: foodWine.id,
      createdById: editor.id,
    },
    // New York Activities
    {
      title: 'Empire State Building Sunrise Experience',
      price: 85.0,
      currencyId: usd.id,
      addressId: newYorkEmpireAddr.id,
      activityTypeId: sightseeing.id,
      createdById: adminUser.id,
    },
    {
      title: 'Statue of Liberty & Ellis Island Tour',
      price: 65.0,
      currencyId: usd.id,
      addressId: newYorkLibertyAddr.id,
      activityTypeId: historicalTours.id,
      createdById: contentManager.id,
    },
    {
      title: 'Broadway Show with Backstage Access',
      price: 250.0,
      currencyId: usd.id,
      addressId: newYorkEmpireAddr.id,
      activityTypeId: nightlife.id,
      createdById: editor.id,
    },
    // Marrakech Activities
    {
      title: 'Jemaa el-Fnaa Night Market Food Tour',
      price: 350.0,
      currencyId: aed.id,
      addressId: marrakechJemaaAddr.id,
      activityTypeId: foodWine.id,
      createdById: adminUser.id,
    },
    {
      title: 'Marrakech Souk Shopping Experience',
      price: 200.0,
      currencyId: aed.id,
      addressId: marrakechSoukAddr.id,
      activityTypeId: shopping.id,
      createdById: contentManager.id,
    },
    // Queenstown Activities
    {
      title: 'Bungee Jumping at Kawarau Bridge',
      price: 205.0,
      currencyId: aud.id,
      addressId: queenstownAddr.id,
      activityTypeId: extremeSports.id,
      createdById: editor.id,
    },
    // Amsterdam Activities
    {
      title: 'Rijksmuseum & Van Gogh Museum Tour',
      price: 85.0,
      currencyId: eur.id,
      addressId: amsterdamMuseumAddr.id,
      activityTypeId: artMuseums.id,
      createdById: adminUser.id,
    },
    {
      title: 'Amsterdam Canal Cruise with Wine & Cheese',
      price: 55.0,
      currencyId: eur.id,
      addressId: amsterdamDamAddr.id,
      activityTypeId: boatCruises.id,
      createdById: contentManager.id,
    },
    // Bali Activities
    {
      title: 'Ubud Rice Terraces & Temple Tour',
      price: 450000.0,
      currencyId: thb.id,
      addressId: baliUbudAddr.id,
      activityTypeId: sightseeing.id,
      createdById: editor.id,
    },
    {
      title: 'Balinese Cooking Class with Market Visit',
      price: 350000.0,
      currencyId: thb.id,
      addressId: baliKutaAddr.id,
      activityTypeId: cookingClasses.id,
      createdById: adminUser.id,
    },
    // Prague Activities
    {
      title: 'Prague Castle & Charles Bridge Tour',
      price: 45.0,
      currencyId: eur.id,
      addressId: pragueCastleAddr.id,
      activityTypeId: historicalTours.id,
      createdById: contentManager.id,
    },
    // Maldives Activities
    {
      title: 'Overwater Spa & Wellness Retreat',
      price: 350.0,
      currencyId: usd.id,
      addressId: maldivesAtollAddr.id,
      activityTypeId: wellness.id,
      createdById: editor.id,
    },
    // Seoul Activities
    {
      title: 'N Seoul Tower & Night View Tour',
      price: 45000.0,
      currencyId: krw.id,
      addressId: seoulTowerAddr.id,
      activityTypeId: sightseeing.id,
      createdById: adminUser.id,
    },
    {
      title: 'Gyeongbokgung Palace Hanbok Experience',
      price: 35000.0,
      currencyId: krw.id,
      addressId: seoulPalaceAddr.id,
      activityTypeId: culturalExperience.id,
      createdById: contentManager.id,
    },
    // Mexico City Activities
    {
      title: 'Chapultepec Castle & Anthropology Museum',
      price: 650.0,
      currencyId: mxn.id,
      addressId: mexicoCityReformaAddr.id,
      activityTypeId: historicalTours.id,
      createdById: editor.id,
    },
    // Lisbon Activities
    {
      title: 'Lisbon Tram 28 & Alfama Walking Tour',
      price: 35.0,
      currencyId: eur.id,
      addressId: lisbonLiberdadeAddr.id,
      activityTypeId: sightseeing.id,
      createdById: adminUser.id,
    },
    // Helsinki Activities
    {
      title: 'Suomenlinna Fortress & Ferry Tour',
      price: 25.0,
      currencyId: eur.id,
      addressId: helsinkiSuomenlinnaAddr.id,
      activityTypeId: historicalTours.id,
      createdById: contentManager.id,
    },
    // Santorini Activities
    {
      title: 'Santorini Sunset Catamaran Cruise',
      price: 180.0,
      currencyId: eur.id,
      addressId: santoriniOiaAddr.id,
      activityTypeId: boatCruises.id,
      createdById: editor.id,
    },
    // Istanbul Activities
    {
      title: 'Blue Mosque & Hagia Sophia Tour',
      price: 750.0,
      currencyId: try_.id,
      addressId: istanbulSultanAddr.id,
      activityTypeId: historicalTours.id,
      createdById: adminUser.id,
    },
    // Copenhagen Activities
    {
      title: 'Copenhagen Biking Food Tour',
      price: 450.0,
      currencyId: eur.id,
      addressId: copenhagenMermaidAddr.id,
      activityTypeId: foodWine.id,
      createdById: contentManager.id,
    },
    // Reykjavik Activities
    {
      title: 'Northern Lights Photography Expedition',
      price: 15000.0,
      currencyId: eur.id,
      addressId: reykjavikChurchAddr.id,
      activityTypeId: photography.id,
      createdById: editor.id,
    },
    // Mumbai Activities
    {
      title: 'Gateway of India & Elephanta Caves Tour',
      price: 2500.0,
      currencyId: inr.id,
      addressId: mumbaiGatewayAddr.id,
      activityTypeId: historicalTours.id,
      createdById: adminUser.id,
    },
    // Vienna Activities
    {
      title: 'Schönbrunn Palace & Mozart Concert',
      price: 95.0,
      currencyId: eur.id,
      addressId: viennaSchonbrunnAddr.id,
      activityTypeId: culturalExperience.id,
      createdById: contentManager.id,
    },
  ];

  const activities = await Promise.all(
    activitiesData.map((data) =>
      prisma.activity.create({
        data: {
          id: crypto.randomUUID(),
          ...data,
          isActive: true,
        },
      }),
    ),
  );

  console.log('✅ Created 60 activities');

  // Create Accommodations (30 accommodations - mix of hotels and houses)
  console.log('🏨 Creating accommodations...');

  // PARIS ACCOMMODATIONS (3)
  const accParisHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Grand Palace Paris - Luxury Hotel',
      description:
        'Experience unparalleled luxury in the heart of Paris, just steps from the Champs-Élysées. Overlooking the Seine River with stunning Eiffel Tower views from our rooftop terrace.',
      addressId: hotelParisAddr.id,
      destinationId: paris.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Free High-Speed WiFi' },
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Indoor Heated Pool' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Luxury Spa & Wellness Center' },
        { id: crypto.randomUUID(), icon: 'IconCar', title: 'Valet Parking' },
        { id: crypto.randomUUID(), icon: 'IconCoffee', title: 'Artisan Coffee Shop' },
        { id: crypto.randomUUID(), icon: 'IconBarbell', title: '24/7 Fitness Center' },
        {
          id: crypto.randomUUID(),
          icon: 'IconToolsKitchen2',
          title: '3 Michelin-Starred Restaurants',
        },
        { id: crypto.randomUUID(), icon: 'IconGlassFull', title: 'Champagne & Wine Bar' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00 to 00:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 24 hours before arrival',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconPaw',
          title: 'Pets',
          description: 'Pets allowed on request. Additional charges may apply.',
        },
      ],
      favoriteCount: 245,
      createdById: adminUser.id,
    },
  });

  const hotelParis = await prisma.hotel.create({
    data: { accommodationId: accParisHotel.id, createdById: adminUser.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Deluxe Room with Eiffel Tower View',
        count: 15,
        area: 35,
        price: 450.0,
        discount: 50.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: '55" 4K Smart TV' },
          { icon: 'IconTemperature', title: 'Smart Climate Control' },
          { icon: 'IconFridge', title: 'Fully Stocked Minibar' },
          { icon: 'IconLock', title: 'Digital Laptop Safe' },
          { icon: 'IconBath', title: 'Marble Bathtub' },
        ],
        beds: { king: 1 },
        hotelId: hotelParis.id,
        currencyId: eur.id,
        createdById: adminUser.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Presidential Suite',
        count: 3,
        area: 120,
        price: 2500.0,
        capacity: 4,
        bedrooms: 2,
        bathrooms: 2,
        amenities: [
          { icon: 'IconDeviceTv', title: '75" OLED TV with Surround Sound' },
          { icon: 'IconBath', title: 'Private Jacuzzi with City View' },
          { icon: 'IconUserStar', title: 'Dedicated Butler Service' },
          { icon: 'IconMusic', title: 'Steinway Baby Grand Piano' },
          { icon: 'IconBalcony', title: 'Private Wrap-Around Balcony' },
        ],
        beds: { king: 2, single: 2 },
        hotelId: hotelParis.id,
        currencyId: eur.id,
        createdById: adminUser.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Classic Room',
        count: 25,
        area: 25,
        price: 280.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: '42" Smart TV' },
          { icon: 'IconAirConditioning', title: 'Air Conditioning' },
          { icon: 'IconCoffee', title: 'Nespresso Machine' },
        ],
        beds: { queen: 1 },
        hotelId: hotelParis.id,
        currencyId: eur.id,
        createdById: contentManager.id,
      },
    ],
  });

  const accParisBoutique = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Le Marais Boutique Apartments',
      description:
        'Charming boutique apartments in the trendy Le Marais district. Each apartment features exposed beams, modern amenities, and walking distance to Notre-Dame and Place des Vosges.',
      addressId: concordeAddr.id,
      destinationId: paris.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Free WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Full Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconLaundry', title: 'In-unit Washer/Dryer' },
        { id: crypto.randomUUID(), icon: 'IconAirConditioning', title: 'Air Conditioning' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 16:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 11:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 48 hours before arrival',
        },
      ],
      favoriteCount: 178,
      createdById: editor.id,
    },
  });

  const hotelParisBoutique = await prisma.hotel.create({
    data: { accommodationId: accParisBoutique.id, createdById: editor.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Studio Apartment',
        count: 10,
        area: 30,
        price: 200.0,
        capacity: 2,
        bedrooms: 0,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconCoffee', title: 'Nespresso Machine' },
        ],
        beds: { queen: 1 },
        hotelId: hotelParisBoutique.id,
        currencyId: eur.id,
        createdById: editor.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'One-Bedroom Suite',
        count: 8,
        area: 50,
        price: 320.0,
        capacity: 3,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: '50" Smart TV' },
          { icon: 'IconToolsKitchen2', title: 'Full Kitchen' },
          { icon: 'IconSofa', title: 'Sofa Bed' },
        ],
        beds: { queen: 1, single: 1 },
        hotelId: hotelParisBoutique.id,
        currencyId: eur.id,
        createdById: editor.id,
      },
    ],
  });

  const accParisHouse = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Montmartre Artist Loft',
      description:
        'A beautiful loft in the heart of Montmartre with stunning views of Sacré-Cœur. This former artist studio features high ceilings, abundant natural light, and a private rooftop terrace.',
      addressId: louvreAddr.id,
      destinationId: paris.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'High-Speed WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Chef Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconPalette', title: 'Artist Studio Space' },
        { id: crypto.randomUUID(), icon: 'IconBalcony', title: 'Rooftop Terrace' },
        { id: crypto.randomUUID(), icon: 'IconFireplace', title: 'Decorative Fireplace' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 11:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 5 days before arrival',
        },
      ],
      favoriteCount: 234,
      createdById: contentManager.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accParisHouse.id,
      price: 380.0,
      discount: 30.0,
      capacity: 4,
      area: 85,
      bathrooms: 1,
      bedrooms: 2,
      floors: 1,
      availableDates: [
        { date: '2024-05-01', price: 400.0 },
        { date: '2024-06-01', price: 450.0 },
        { date: '2024-07-01', price: 500.0 },
        { date: '2024-09-01', price: 400.0 },
      ],
      currencyId: eur.id,
      createdById: contentManager.id,
    },
  });

  console.log('✅ Paris: 3 accommodations');

  // TOKYO ACCOMMODATIONS (3)
  const accTokyoRyokan = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Traditional Ryokan - Sakura House',
      description:
        'Immerse yourself in authentic Japanese hospitality. This traditional ryokan features tatami rooms, natural onsen hot springs, and exquisite kaiseki dining in quiet Shinjuku.',
      addressId: shinjukuAddr.id,
      destinationId: tokyo.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconDroplet', title: 'Natural Onsen Hot Spring' },
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Free WiFi Throughout' },
        {
          id: crypto.randomUUID(),
          icon: 'IconToolsKitchen2',
          title: 'Kaiseki Fine Dining Restaurant',
        },
        { id: crypto.randomUUID(), icon: 'IconCup', title: 'Traditional Tea Ceremony Room' },
        { id: crypto.randomUUID(), icon: 'IconTrees', title: 'Zen Meditation Garden' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Japanese Massage Service' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00 to 20:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 10:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 3 days before arrival',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconShoe',
          title: 'Indoor Shoes',
          description: 'Please remove shoes at genkan entrance.',
        },
      ],
      favoriteCount: 312,
      createdById: adminUser.id,
    },
  });

  const hotelTokyo = await prisma.hotel.create({
    data: { accommodationId: accTokyoRyokan.id, createdById: adminUser.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Traditional Tatami Suite with Private Onsen',
        count: 8,
        area: 45,
        price: 45000.0,
        discount: 5000.0,
        capacity: 3,
        bathrooms: 1,
        amenities: [
          { icon: 'IconBed', title: 'Premium Silk Futon Beds' },
          { icon: 'IconDroplet', title: 'Private Open-air Onsen Bath' },
          { icon: 'IconCup', title: 'Traditional Tea Ceremony Set' },
        ],
        beds: { double: 2, single: 1 },
        hotelId: hotelTokyo.id,
        currencyId: jpy.id,
        createdById: adminUser.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Deluxe Modern-Japanese Suite',
        count: 5,
        area: 55,
        price: 65000.0,
        capacity: 4,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: '65" 4K Smart TV' },
          { icon: 'IconFridge', title: 'Premium Sake Minibar' },
          { icon: 'IconMassage', title: 'Shiatsu Massage Chair' },
        ],
        beds: { king: 1, double: 1 },
        hotelId: hotelTokyo.id,
        currencyId: jpy.id,
        createdById: adminUser.id,
      },
    ],
  });

  const accTokyoCapsule = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Nine Hours Shinjuku Capsule Hotel',
      description:
        'A futuristic capsule hotel experience in the heart of Tokyo. Sleek, minimalist design with pod-style sleeping quarters and shared luxury bathing facilities. Perfect for the modern traveler.',
      addressId: akasakaAddr.id,
      destinationId: tokyo.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Free High-Speed WiFi' },
        { id: crypto.randomUUID(), icon: 'IconDroplet', title: 'Shared Japanese Bath' },
        { id: crypto.randomUUID(), icon: 'IconLock', title: 'Personal Locker' },
        { id: crypto.randomUUID(), icon: 'IconCoffee', title: '24/7 Coffee Station' },
        { id: crypto.randomUUID(), icon: 'IconSlippers', title: 'Amenity Kit Provided' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 13:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 10:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 24 hours before arrival',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconUsers',
          title: 'Gender',
          description: 'Gender-separated floors',
        },
      ],
      favoriteCount: 156,
      createdById: editor.id,
    },
  });

  const hotelTokyoCapsule = await prisma.hotel.create({
    data: { accommodationId: accTokyoCapsule.id, createdById: editor.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Standard Capsule Pod',
        count: 120,
        area: 3,
        price: 4500.0,
        capacity: 1,
        bathrooms: 0,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Built-in Screen' },
          { icon: 'IconBulb', title: 'Adjustable Lighting' },
        ],
        beds: { single: 1 },
        hotelId: hotelTokyoCapsule.id,
        currencyId: jpy.id,
        createdById: editor.id,
      },
    ],
  });

  const accTokyoHouse = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Shibuya Modern Townhouse',
      description:
        'A sleek three-story townhouse in the vibrant Shibuya district. Walking distance to the famous crossing, with a rooftop terrace offering stunning city views.',
      addressId: shibuyaAddr.id,
      destinationId: tokyo.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Fiber Internet' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Smart Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconAirConditioning', title: 'Climate Control' },
        { id: crypto.randomUUID(), icon: 'IconBalcony', title: 'Rooftop Terrace' },
        { id: crypto.randomUUID(), icon: 'IconLaundry', title: 'Washing Machine' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 16:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 10:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 3 days before arrival',
        },
      ],
      favoriteCount: 287,
      createdById: contentManager.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accTokyoHouse.id,
      price: 35000.0,
      capacity: 6,
      area: 95,
      bathrooms: 2,
      bedrooms: 3,
      floors: 3,
      availableDates: [
        { date: '2024-04-01', price: 40000.0 },
        { date: '2024-05-01', price: 38000.0 },
        { date: '2024-10-01', price: 45000.0 },
        { date: '2024-11-01', price: 42000.0 },
      ],
      currencyId: jpy.id,
      createdById: contentManager.id,
    },
  });

  console.log('✅ Tokyo: 3 accommodations');

  // BARCELONA ACCOMMODATIONS (2)
  const accBarcelonaBeach = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Mediterranean Beach House Barcelona',
      description:
        'Beautiful beachfront house with direct access to Barceloneta Beach. Modern design with traditional Mediterranean touches, featuring a stunning rooftop terrace.',
      addressId: parkGuellAddr.id,
      destinationId: barcelona.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconBeach', title: 'Direct Beach Access' },
        { id: crypto.randomUUID(), icon: 'IconBalcony', title: 'Rooftop Terrace with Sea View' },
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Free High-Speed WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Modern Open Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconAirConditioning', title: 'Air Conditioning' },
        { id: crypto.randomUUID(), icon: 'IconGrill', title: 'Gas BBQ on Terrace' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 16:00 to 23:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 11:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 7 days before arrival',
        },
      ],
      favoriteCount: 167,
      createdById: contentManager.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accBarcelonaBeach.id,
      price: 350.0,
      discount: 25.0,
      capacity: 6,
      area: 160,
      bathrooms: 2,
      bedrooms: 3,
      floors: 2,
      availableDates: [
        { date: '2024-05-01', price: 400.0 },
        { date: '2024-06-15', price: 500.0 },
        { date: '2024-07-01', price: 550.0 },
        { date: '2024-08-01', price: 650.0 },
        { date: '2024-09-01', price: 450.0 },
      ],
      currencyId: eur.id,
      createdById: contentManager.id,
    },
  });

  const accBarcelonaHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'W Barcelona - Beachfront Luxury',
      description:
        "An iconic sail-shaped hotel on Barcelona's coastline. Features designer rooms with Mediterranean views, a rooftop bar, and world-class spa facilities.",
      addressId: passeigGraciaAddr.id,
      destinationId: barcelona.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Rooftop Infinity Pool' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Bliss Spa' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: '5 Restaurants & Bars' },
        { id: crypto.randomUUID(), icon: 'IconBarbell', title: 'FIT Fitness Center' },
        { id: crypto.randomUUID(), icon: 'IconBeach', title: 'Private Beach Access' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 48 hours before arrival',
        },
      ],
      favoriteCount: 523,
      createdById: adminUser.id,
    },
  });

  const hotelBarcelona = await prisma.hotel.create({
    data: { accommodationId: accBarcelonaHotel.id, createdById: adminUser.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Wonderful Room with Sea View',
        count: 30,
        area: 37,
        price: 280.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: '49" Smart TV' },
          { icon: 'IconAirConditioning', title: 'Air Conditioning' },
          { icon: 'IconFridge', title: 'Minibar' },
        ],
        beds: { king: 1 },
        hotelId: hotelBarcelona.id,
        currencyId: eur.id,
        createdById: adminUser.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Extreme Wow Suite',
        count: 3,
        area: 120,
        price: 1800.0,
        capacity: 4,
        bedrooms: 2,
        bathrooms: 2,
        amenities: [
          { icon: 'IconDeviceTv', title: '65" OLED TV' },
          { icon: 'IconBath', title: 'Whirlpool with Sea View' },
          { icon: 'IconUserStar', title: 'Personal Concierge' },
          { icon: 'IconMusic', title: 'Sound System' },
        ],
        beds: { king: 2 },
        hotelId: hotelBarcelona.id,
        currencyId: eur.id,
        createdById: adminUser.id,
      },
    ],
  });

  console.log('✅ Barcelona: 2 accommodations');

  // ZURICH ACCOMMODATIONS (2)
  const accZurichChalet = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Alpine Luxury Chalet Zurich',
      description:
        'A magnificent chalet with breathtaking views of the Swiss Alps. Features traditional Swiss architecture with modern luxury, private sauna, and outdoor hot tub.',
      addressId: zurichOldAddr.id,
      destinationId: zurich.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconFireplace', title: 'Grand Stone Fireplace' },
        {
          id: crypto.randomUUID(),
          icon: 'IconSnowflake',
          title: 'Ski Room with Heated Boot Racks',
        },
        { id: crypto.randomUUID(), icon: 'IconDroplet', title: 'Private Finnish Sauna' },
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'High-Speed Fiber WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Gourmet Swiss Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconMountain', title: 'Panoramic Mountain View Terrace' },
        { id: crypto.randomUUID(), icon: 'IconCar', title: 'Heated Underground Garage' },
        { id: crypto.randomUUID(), icon: 'IconDroplet', title: 'Outdoor Cedar Hot Tub' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 16:00 to 20:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 10:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 14 days before arrival',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconPaw',
          title: 'Pets',
          description: 'Well-behaved pets welcome (max 2)',
        },
      ],
      favoriteCount: 298,
      createdById: adminUser.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accZurichChalet.id,
      price: 1200.0,
      discount: 150.0,
      capacity: 10,
      area: 300,
      bathrooms: 4,
      bedrooms: 5,
      floors: 3,
      availableDates: [
        { date: '2024-12-01', price: 1800.0 },
        { date: '2024-12-20', price: 2500.0 },
        { date: '2024-12-25', price: 3000.0 },
        { date: '2025-01-01', price: 2800.0 },
        { date: '2025-02-01', price: 2200.0 },
        { date: '2025-03-01', price: 1800.0 },
        { date: '2025-06-01', price: 1400.0 },
      ],
      currencyId: chf.id,
      createdById: adminUser.id,
    },
  });

  const accZurichHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Baur au Lac - Zurich Luxury',
      description:
        'A legendary hotel overlooking Lake Zurich and the Alps. Family-owned since 1844, offering timeless elegance with modern comfort in the heart of Zurich.',
      addressId: zurichRennwegAddr.id,
      destinationId: zurich.id,
      amenities: [
        {
          id: crypto.randomUUID(),
          icon: 'IconToolsKitchen2',
          title: 'Michelin-Starred Restaurant',
        },
        { id: crypto.randomUUID(), icon: 'IconGlassFull', title: 'Wine Cellar' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Luxury Spa' },
        { id: crypto.randomUUID(), icon: 'IconCar', title: 'Chauffeur Service' },
        { id: crypto.randomUUID(), icon: 'IconTrees', title: 'Private Park' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 24 hours before arrival',
        },
      ],
      favoriteCount: 345,
      createdById: contentManager.id,
    },
  });

  const hotelZurich = await prisma.hotel.create({
    data: { accommodationId: accZurichHotel.id, createdById: contentManager.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Lake View Deluxe Room',
        count: 20,
        area: 40,
        price: 850.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconFridge', title: 'Minibar' },
          { icon: 'IconBath', title: 'Marble Bathroom' },
        ],
        beds: { king: 1 },
        hotelId: hotelZurich.id,
        currencyId: chf.id,
        createdById: contentManager.id,
      },
    ],
  });

  console.log('✅ Zurich: 2 accommodations');

  // LONDON ACCOMMODATIONS (3)
  const accLondonBoutique = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'The Mayfair Boutique Hotel',
      description:
        'An elegant boutique hotel in prestigious Mayfair. Just a short stroll from Buckingham Palace and Hyde Park, this Georgian townhouse offers refined luxury with personalized service.',
      addressId: buckinghamAddr.id,
      destinationId: london.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Free Ultra-Fast WiFi' },
        {
          id: crypto.randomUUID(),
          icon: 'IconToolsKitchen2',
          title: 'Michelin-Starred Restaurant',
        },
        { id: crypto.randomUUID(), icon: 'IconGlassFull', title: 'Art Deco Cocktail Bar' },
        { id: crypto.randomUUID(), icon: 'IconBarbell', title: 'Private Fitness Suite' },
        { id: crypto.randomUUID(), icon: 'IconUserStar', title: '24/7 Personal Concierge' },
        { id: crypto.randomUUID(), icon: 'IconCar', title: 'Chauffeur & Bentley Service' },
        { id: crypto.randomUUID(), icon: 'IconCup', title: 'Traditional Afternoon Tea' },
        { id: crypto.randomUUID(), icon: 'IconTrees', title: 'Private Walled Garden' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 14:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 48 hours before arrival',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconShirt',
          title: 'Dress Code',
          description: 'Smart casual in public areas after 18:00',
        },
      ],
      favoriteCount: 423,
      createdById: adminUser.id,
    },
  });

  const hotelLondon = await prisma.hotel.create({
    data: { accommodationId: accLondonBoutique.id, createdById: adminUser.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Classic Room',
        count: 20,
        area: 28,
        price: 350.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Smart TV with Sky' },
          { icon: 'IconAirConditioning', title: 'Air Conditioning' },
          { icon: 'IconCoffee', title: 'Nespresso Machine' },
          { icon: 'IconLock', title: 'Laptop Safe' },
        ],
        beds: { queen: 1 },
        hotelId: hotelLondon.id,
        currencyId: gbp.id,
        createdById: adminUser.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Deluxe King Room',
        count: 10,
        area: 35,
        price: 550.0,
        discount: 75.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: '55" Smart TV' },
          { icon: 'IconFridge', title: 'Fully Stocked British Minibar' },
          { icon: 'IconBath', title: 'Freestanding Roll-top Bathtub' },
          { icon: 'IconLock', title: 'Digital Safe' },
        ],
        beds: { king: 1 },
        hotelId: hotelLondon.id,
        currencyId: gbp.id,
        createdById: contentManager.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Royal Suite',
        count: 2,
        area: 90,
        price: 1800.0,
        capacity: 4,
        bedrooms: 2,
        bathrooms: 2,
        amenities: [
          { icon: 'IconDeviceTv', title: '2x 65" OLED TVs' },
          { icon: 'IconBath', title: 'Marble Jacuzzi with TV' },
          { icon: 'IconUserStar', title: 'Dedicated Butler' },
          { icon: 'IconMusic', title: 'Yamaha Grand Piano' },
          { icon: 'IconFireplace', title: 'Original Marble Fireplace' },
        ],
        beds: { king: 2, single: 2 },
        hotelId: hotelLondon.id,
        currencyId: gbp.id,
        createdById: adminUser.id,
      },
    ],
  });

  const accLondonFlat = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Notting Hill Garden Flat',
      description:
        'A colorful ground-floor flat in the heart of Notting Hill. Private garden access, walking distance to Portobello Road Market and Hyde Park. Perfect for couples or small families.',
      addressId: bakerStreetAddr.id,
      destinationId: london.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Fast WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Modern Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconTrees', title: 'Private Garden' },
        { id: crypto.randomUUID(), icon: 'IconDeviceTv', title: 'Smart TV' },
        { id: crypto.randomUUID(), icon: 'IconLaundry', title: 'Washer/Dryer' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 11:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 5 days before arrival',
        },
      ],
      favoriteCount: 198,
      createdById: editor.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accLondonFlat.id,
      price: 280.0,
      capacity: 4,
      area: 75,
      bathrooms: 1,
      bedrooms: 2,
      floors: 1,
      availableDates: [
        { date: '2024-05-01', price: 320.0 },
        { date: '2024-06-01', price: 350.0 },
        { date: '2024-07-01', price: 380.0 },
        { date: '2024-09-01', price: 300.0 },
        { date: '2024-12-20', price: 400.0 },
      ],
      currencyId: gbp.id,
      createdById: editor.id,
    },
  });

  const accLondonPenthouse = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Shard View Penthouse',
      description:
        'A stunning penthouse apartment with floor-to-ceiling windows offering panoramic views of The Shard and Tower Bridge. Ultra-modern design with smart home technology.',
      addressId: downingStreetAddr.id,
      destinationId: london.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Gigabit WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Chef Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconDeviceTv', title: 'Home Cinema System' },
        { id: crypto.randomUUID(), icon: 'IconBalcony', title: 'Wrap-Around Balcony' },
        { id: crypto.randomUUID(), icon: 'IconCar', title: 'Underground Parking' },
        { id: crypto.randomUUID(), icon: 'IconLock', title: '24/7 Security' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 16:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 11:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 7 days before arrival',
        },
      ],
      favoriteCount: 312,
      createdById: contentManager.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accLondonPenthouse.id,
      price: 750.0,
      discount: 50.0,
      capacity: 4,
      area: 130,
      bathrooms: 2,
      bedrooms: 2,
      floors: 1,
      availableDates: [
        { date: '2024-05-01', price: 800.0 },
        { date: '2024-06-01', price: 900.0 },
        { date: '2024-07-01', price: 1000.0 },
        { date: '2024-12-01', price: 850.0 },
      ],
      currencyId: gbp.id,
      createdById: contentManager.id,
    },
  });

  console.log('✅ London: 3 accommodations');

  // ROME ACCOMMODATIONS (2)
  const accRomeVilla = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Villa Borghese Luxury Retreat',
      description:
        'A stunning private villa near the historic Villa Borghese gardens with panoramic views of Rome. Features a private pool, expansive gardens, and authentic Roman architecture.',
      addressId: villaTuscanyAddr.id,
      destinationId: rome.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Private Infinity Pool' },
        { id: crypto.randomUUID(), icon: 'IconTrees', title: 'Mediterranean Garden' },
        { id: crypto.randomUUID(), icon: 'IconGrill', title: 'Outdoor BBQ Area' },
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Free High-Speed WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Gourmet Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconCar', title: 'Private Parking (3 cars)' },
        { id: crypto.randomUUID(), icon: 'IconAirConditioning', title: 'Central Air Conditioning' },
        { id: crypto.randomUUID(), icon: 'IconFireplace', title: 'Stone Fireplace' },
        { id: crypto.randomUUID(), icon: 'IconGlassFull', title: 'Wine Cellar' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 14:00 to 22:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 10:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 5 days before arrival',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconPaw',
          title: 'Pets',
          description: 'Well-behaved pets welcome at no extra charge',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconMoon',
          title: 'Quiet Hours',
          description: '22:00 - 08:00',
        },
      ],
      favoriteCount: 189,
      createdById: contentManager.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accRomeVilla.id,
      price: 850.0,
      discount: 100.0,
      capacity: 8,
      area: 250,
      bathrooms: 3,
      bedrooms: 4,
      floors: 2,
      availableDates: [
        { date: '2024-03-15', price: 950.0 },
        { date: '2024-04-01', price: 1100.0 },
        { date: '2024-06-01', price: 1300.0 },
        { date: '2024-08-15', price: 1500.0 },
        { date: '2024-09-15', price: 1000.0 },
        { date: '2024-12-25', price: 1500.0 },
        { date: '2024-12-31', price: 1800.0 },
      ],
      currencyId: eur.id,
      createdById: contentManager.id,
    },
  });

  const accRomeHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Hotel de Russie - Rooftop Garden',
      description:
        'A luxurious hotel between Piazza del Popolo and the Spanish Steps. Famous for its terraced Secret Garden, where you can dine among Roman ruins and lush citrus trees.',
      addressId: spanishStepsAddr.id,
      destinationId: rome.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconTrees', title: 'Secret Garden Terrace' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'De Russie Spa' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Garden Restaurant' },
        { id: crypto.randomUUID(), icon: 'IconBarbell', title: 'Fitness Center' },
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Free WiFi' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 24 hours before arrival',
        },
      ],
      favoriteCount: 567,
      createdById: adminUser.id,
    },
  });

  const hotelRome = await prisma.hotel.create({
    data: { accommodationId: accRomeHotel.id, createdById: adminUser.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Classic Double Room',
        count: 25,
        area: 32,
        price: 450.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconAirConditioning', title: 'Air Conditioning' },
          { icon: 'IconFridge', title: 'Minibar' },
        ],
        beds: { queen: 1 },
        hotelId: hotelRome.id,
        currencyId: eur.id,
        createdById: adminUser.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Nijinsky Suite',
        count: 5,
        area: 80,
        price: 1800.0,
        capacity: 3,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: '60" Smart TV' },
          { icon: 'IconBath', title: 'Freestanding Bathtub' },
          { icon: 'IconSofa', title: 'Separate Living Room' },
          { icon: 'IconBalcony', title: 'Garden View Balcony' },
        ],
        beds: { king: 1, single: 1 },
        hotelId: hotelRome.id,
        currencyId: eur.id,
        createdById: contentManager.id,
      },
    ],
  });

  console.log('✅ Rome: 2 accommodations');

  // DUBAI ACCOMMODATIONS (2)
  const accDubaiHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Burj Al Arab Luxury Experience',
      description:
        'The iconic sail-shaped hotel offering the ultimate in luxury. Each suite features floor-to-ceiling windows with Arabian Gulf views and a private butler.',
      addressId: dubaiBeachAddr.id,
      destinationId: dubai.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Infinity Pools' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Talise Spa' },
        { id: crypto.randomUUID(), icon: 'IconBeach', title: 'Private Beach' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: '9 World-Class Restaurants' },
        { id: crypto.randomUUID(), icon: 'IconHelicopter', title: 'Helipad Transfers' },
        { id: crypto.randomUUID(), icon: 'IconCar', title: 'Rolls-Royce Chauffeur' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 14:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 7 days before arrival',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconShirt',
          title: 'Dress Code',
          description: 'Smart casual in public areas',
        },
      ],
      favoriteCount: 678,
      createdById: editor.id,
    },
  });

  const hotelDubai = await prisma.hotel.create({
    data: { accommodationId: accDubaiHotel.id, createdById: editor.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Deluxe Marina Suite',
        count: 20,
        area: 60,
        price: 2500.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: '65" Smart TV' },
          { icon: 'IconFridge', title: 'Premium Minibar' },
          { icon: 'IconBath', title: 'Jacuzzi with Sea View' },
        ],
        beds: { king: 1 },
        hotelId: hotelDubai.id,
        currencyId: aed.id,
        createdById: editor.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Royal Suite',
        count: 5,
        area: 200,
        price: 15000.0,
        capacity: 6,
        bedrooms: 3,
        bathrooms: 3,
        amenities: [
          { icon: 'IconDeviceTv', title: '85" Cinema Screen' },
          { icon: 'IconUserStar', title: '24/7 Butler Service' },
          { icon: 'IconBath', title: 'Gold-Plated Bathroom Fittings' },
          { icon: 'IconMusic', title: 'Private Cinema Room' },
        ],
        beds: { king: 3, single: 2 },
        hotelId: hotelDubai.id,
        currencyId: aed.id,
        createdById: editor.id,
      },
    ],
  });

  const accDubaiDesert = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Al Maha Desert Resort & Spa',
      description:
        'A luxury Bedouin-style retreat nestled in the Dubai Desert Conservation Reserve. Features private pools overlooking endless dunes, wildlife encounters, and traditional Arabian experiences.',
      addressId: dubaiBurjAddr.id,
      destinationId: dubai.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Private Temperature-Controlled Pool' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Timeless Spa' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Desert Dining Experiences' },
        { id: crypto.randomUUID(), icon: 'IconBinoculars', title: 'Wildlife Drives' },
        { id: crypto.randomUUID(), icon: 'IconHorse', title: 'Camel & Horse Riding' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 14 days before arrival',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconUsers',
          title: 'Adults Only',
          description: 'Resort welcomes guests 12 years and above',
        },
      ],
      favoriteCount: 456,
      createdById: adminUser.id,
    },
  });

  const hotelDubaiDesert = await prisma.hotel.create({
    data: { accommodationId: accDubaiDesert.id, createdById: adminUser.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Bedouin Suite with Pool',
        count: 42,
        area: 75,
        price: 3500.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconPool', title: 'Private Pool' },
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconPalette', title: 'Original Artwork' },
          { icon: 'IconBath', title: 'Rainfall Shower & Bathtub' },
        ],
        beds: { king: 1 },
        hotelId: hotelDubaiDesert.id,
        currencyId: aed.id,
        createdById: adminUser.id,
      },
    ],
  });

  console.log('✅ Dubai: 2 accommodations');

  // NEW YORK ACCOMMODATIONS (2)
  const accNYHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'The Plaza Hotel - Fifth Avenue',
      description:
        "A legendary New York icon at the corner of Fifth Avenue and Central Park South. Experience timeless elegance with modern luxury at one of the world's most famous hotels.",
      addressId: newYorkEmpireAddr.id,
      destinationId: newYork.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Guerlain Spa' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Palm Court Restaurant' },
        { id: crypto.randomUUID(), icon: 'IconGlassFull', title: 'Champagne Bar' },
        { id: crypto.randomUUID(), icon: 'IconBarbell', title: 'Fitness Center' },
        { id: crypto.randomUUID(), icon: 'IconUserStar', title: 'Butler Service' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 48 hours before arrival',
        },
      ],
      favoriteCount: 789,
      createdById: contentManager.id,
    },
  });

  const hotelNY = await prisma.hotel.create({
    data: { accommodationId: accNYHotel.id, createdById: contentManager.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Plaza Room with Park View',
        count: 30,
        area: 40,
        price: 850.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconFridge', title: 'Minibar' },
          { icon: 'IconBath', title: 'Marble Bathroom' },
        ],
        beds: { king: 1 },
        hotelId: hotelNY.id,
        currencyId: usd.id,
        createdById: contentManager.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Royal Plaza Suite',
        count: 5,
        area: 150,
        price: 5000.0,
        capacity: 4,
        bedrooms: 2,
        bathrooms: 2,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Multiple Smart TVs' },
          { icon: 'IconMusic', title: 'Steinway Grand Piano' },
          { icon: 'IconUserStar', title: 'Dedicated Butler' },
          { icon: 'IconBath', title: 'Oversized Whirlpool' },
          { icon: 'IconToolsKitchen2', title: 'Private Kitchen' },
        ],
        beds: { king: 2, single: 2 },
        hotelId: hotelNY.id,
        currencyId: usd.id,
        createdById: contentManager.id,
      },
    ],
  });

  const accNYLoft = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'SoHo Industrial Loft',
      description:
        'A stunning converted warehouse loft in the heart of SoHo. Features 14-foot ceilings, exposed brick walls, oversized windows, and modern art installations throughout.',
      addressId: newYorkLibertyAddr.id,
      destinationId: newYork.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Fiber WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Professional Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconPalette', title: 'Art Collection' },
        { id: crypto.randomUUID(), icon: 'IconLaundry', title: 'In-unit Laundry' },
        { id: crypto.randomUUID(), icon: 'IconAirConditioning', title: 'Central AC' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 16:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 11:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 5 days before arrival',
        },
      ],
      favoriteCount: 234,
      createdById: editor.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accNYLoft.id,
      price: 650.0,
      discount: 50.0,
      capacity: 6,
      area: 180,
      bathrooms: 2,
      bedrooms: 2,
      floors: 1,
      availableDates: [
        { date: '2024-09-01', price: 700.0 },
        { date: '2024-10-01', price: 750.0 },
        { date: '2024-11-01', price: 800.0 },
        { date: '2024-12-01', price: 1000.0 },
      ],
      currencyId: usd.id,
      createdById: editor.id,
    },
  });

  console.log('✅ New York: 2 accommodations');

  // AMSTERDAM ACCOMMODATIONS (1)
  const accAmsterdamHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Waldorf Astoria Amsterdam',
      description:
        'A collection of 17th-century canal palaces transformed into an exquisite hotel along the Herengracht. Features a Guerlain spa, Michelin-starred dining, and private garden.',
      addressId: amsterdamDamAddr.id,
      destinationId: amsterdam.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconTrees', title: 'Private Canal Garden' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Guerlain Spa' },
        {
          id: crypto.randomUUID(),
          icon: 'IconToolsKitchen2',
          title: '2 Michelin-Starred Restaurants',
        },
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Indoor Pool' },
        { id: crypto.randomUUID(), icon: 'IconBarbell', title: 'Fitness Center' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 24 hours before arrival',
        },
      ],
      favoriteCount: 345,
      createdById: adminUser.id,
    },
  });

  const hotelAmsterdam = await prisma.hotel.create({
    data: { accommodationId: accAmsterdamHotel.id, createdById: adminUser.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'King Guest Room',
        count: 30,
        area: 35,
        price: 450.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconAirConditioning', title: 'Climate Control' },
          { icon: 'IconFridge', title: 'Minibar' },
        ],
        beds: { king: 1 },
        hotelId: hotelAmsterdam.id,
        currencyId: eur.id,
        createdById: adminUser.id,
      },
    ],
  });

  console.log('✅ Amsterdam: 1 accommodation');

  // BALI ACCOMMODATIONS (2)
  const accBaliResort = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Ubud Hanging Gardens Resort',
      description:
        'A luxury resort built into the steep rice terraces of Ubud. Famous for its iconic split-level infinity pool cascading through the jungle, private villas with personal pools.',
      addressId: baliUbudAddr.id,
      destinationId: bali.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Twin-Tiered Infinity Pool' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Riverside Spa' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Jungle Dining Experiences' },
        { id: crypto.randomUUID(), icon: 'IconYoga', title: 'Yoga Pavilion' },
        { id: crypto.randomUUID(), icon: 'IconTrees', title: 'Tropical Gardens' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 14:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 7 days before arrival',
        },
      ],
      favoriteCount: 678,
      createdById: editor.id,
    },
  });

  const hotelBali = await prisma.hotel.create({
    data: { accommodationId: accBaliResort.id, createdById: editor.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Riverside Pool Villa',
        count: 25,
        area: 100,
        price: 5500000.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconPool', title: 'Private Infinity Pool' },
          { icon: 'IconBath', title: 'Outdoor Rain Shower' },
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconBalcony', title: 'Riverside Deck' },
        ],
        beds: { king: 1 },
        hotelId: hotelBali.id,
        currencyId: thb.id,
        createdById: editor.id,
      },
    ],
  });

  const accBaliVilla = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Canggu Surf Villa',
      description:
        'A modern tropical villa in the hip Canggu area, walking distance to surf breaks. Features an open-plan living space, private pool, and rooftop sunset lounge.',
      addressId: baliKutaAddr.id,
      destinationId: bali.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Private Pool' },
        { id: crypto.randomUUID(), icon: 'IconWind', title: 'Surfboard Storage' },
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Fast WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Outdoor Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconBalcony', title: 'Rooftop Lounge' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 14:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 11:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 5 days before arrival',
        },
      ],
      favoriteCount: 234,
      createdById: contentManager.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accBaliVilla.id,
      price: 2500000.0,
      capacity: 6,
      area: 150,
      bathrooms: 3,
      bedrooms: 3,
      floors: 2,
      availableDates: [
        { date: '2024-05-01', price: 2800000.0 },
        { date: '2024-06-01', price: 3000000.0 },
        { date: '2024-07-01', price: 3500000.0 },
        { date: '2024-08-01', price: 3800000.0 },
        { date: '2024-09-01', price: 3000000.0 },
      ],
      currencyId: thb.id,
      createdById: contentManager.id,
    },
  });

  console.log('✅ Bali: 2 accommodations');

  // MALDIVES ACCOMMODATIONS (1)
  const accMaldivesResort = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Soneva Fushi Overwater Paradise',
      description:
        'An eco-luxury resort offering overwater villas with private pools, personal butler service, and the world-famous outdoor cinema. Experience barefoot luxury at its finest.',
      addressId: maldivesAtollAddr.id,
      destinationId: maldives.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Private Infinity Pool' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Overwater Spa' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: '5 Fine Dining Restaurants' },
        { id: crypto.randomUUID(), icon: 'IconMovie', title: 'Outdoor Cinema' },
        { id: crypto.randomUUID(), icon: 'IconTelescope', title: 'Observatory' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 14:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 14 days before arrival',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconRecycle',
          title: 'Eco Policy',
          description: 'Plastic-free resort. Reef-safe sunscreen provided.',
        },
      ],
      favoriteCount: 890,
      createdById: adminUser.id,
    },
  });

  const hotelMaldives = await prisma.hotel.create({
    data: { accommodationId: accMaldivesResort.id, createdById: adminUser.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Overwater Villa with Pool',
        count: 15,
        area: 80,
        price: 2500.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconBath', title: 'Outdoor Rain Shower' },
          { icon: 'IconPool', title: 'Private Infinity Pool' },
          { icon: 'IconGlass', title: 'Glass Floor Panel' },
        ],
        beds: { king: 1 },
        hotelId: hotelMaldives.id,
        currencyId: usd.id,
        createdById: adminUser.id,
      },
    ],
  });

  console.log('✅ Maldives: 1 accommodation');

  // SANTORINI ACCOMMODATIONS (2)
  const accSantoriniVilla = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Santorini Cliffside Cave House',
      description:
        'A unique cave house carved into the Caldera cliffs of Oia. Features traditional Cycladic architecture with modern luxury, a private plunge pool, and the most famous sunset views in the world.',
      addressId: santoriniOiaAddr.id,
      destinationId: santorini.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Private Plunge Pool' },
        { id: crypto.randomUUID(), icon: 'IconSun', title: 'Caldera View Terrace' },
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Free WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Fully Equipped Kitchen' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 11:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 7 days before arrival',
        },
      ],
      favoriteCount: 534,
      createdById: editor.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accSantoriniVilla.id,
      price: 650.0,
      capacity: 4,
      area: 90,
      bathrooms: 2,
      bedrooms: 2,
      floors: 1,
      availableDates: [
        { date: '2024-06-01', price: 850.0 },
        { date: '2024-07-01', price: 950.0 },
        { date: '2024-08-01', price: 1200.0 },
        { date: '2024-09-01', price: 750.0 },
      ],
      currencyId: eur.id,
      createdById: editor.id,
    },
  });

  const accSantoriniHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Canaves Oia Luxury Hotel',
      description:
        "Voted one of the world's best hotels, built into the Caldera cliffs of Oia. Features infinity pools seemingly merging with the Aegean Sea, and suites carved from volcanic rock.",
      addressId: santoriniOiaAddr.id,
      destinationId: santorini.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Infinity Pool' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Spa & Wellness' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Fine Dining Restaurant' },
        { id: crypto.randomUUID(), icon: 'IconGlassFull', title: 'Wine Cave' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 14 days before arrival',
        },
      ],
      favoriteCount: 456,
      createdById: adminUser.id,
    },
  });

  const hotelSantorini = await prisma.hotel.create({
    data: { accommodationId: accSantoriniHotel.id, createdById: adminUser.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Superior Suite with Plunge Pool',
        count: 12,
        area: 45,
        price: 850.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconPool', title: 'Private Plunge Pool' },
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconBath', title: 'Rainfall Shower' },
        ],
        beds: { king: 1 },
        hotelId: hotelSantorini.id,
        currencyId: eur.id,
        createdById: adminUser.id,
      },
    ],
  });

  console.log('✅ Santorini: 2 accommodations');

  // REYKJAVIK ACCOMMODATIONS (1)
  const accReykjavikHouse = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Northern Lights Glass Cabin',
      description:
        'A stunning glass-roofed cabin located in the Icelandic wilderness, perfect for watching the Northern Lights from the comfort of your bed. Features geothermal heating and a private hot spring.',
      addressId: reykjavikChurchAddr.id,
      destinationId: reykjavik.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconDroplet', title: 'Private Geothermal Hot Spring' },
        { id: crypto.randomUUID(), icon: 'IconGlass', title: 'Glass Roof for Aurora Viewing' },
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Satellite WiFi' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Modern Kitchen' },
        { id: crypto.randomUUID(), icon: 'IconFireplace', title: 'Wood-Burning Stove' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 16:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 11:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 30 days before arrival',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconCar',
          title: '4x4 Vehicle',
          description: '4x4 vehicle strongly recommended in winter',
        },
      ],
      favoriteCount: 432,
      createdById: contentManager.id,
    },
  });

  await prisma.house.create({
    data: {
      id: crypto.randomUUID(),
      accommodationId: accReykjavikHouse.id,
      price: 550.0,
      capacity: 4,
      area: 75,
      bathrooms: 1,
      bedrooms: 1,
      floors: 1,
      availableDates: [
        { date: '2024-10-01', price: 650.0 },
        { date: '2024-11-01', price: 750.0 },
        { date: '2024-12-01', price: 900.0 },
        { date: '2025-01-01', price: 950.0 },
        { date: '2025-02-01', price: 850.0 },
        { date: '2025-03-01', price: 700.0 },
      ],
      currencyId: eur.id,
      createdById: contentManager.id,
    },
  });

  console.log('✅ Reykjavik: 1 accommodation');

  // PRAGUE ACCOMMODATIONS (1)
  const accPragueHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Four Seasons Hotel Prague',
      description:
        'Located on the banks of the Vltava River, this hotel combines Renaissance and Baroque architecture with modern luxury. Steps from Charles Bridge and Prague Castle.',
      addressId: pragueCastleAddr.id,
      destinationId: prague.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconWifi', title: 'Free WiFi' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Spa & Wellness' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Italian Restaurant' },
        { id: crypto.randomUUID(), icon: 'IconBarbell', title: 'Fitness Center' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 24 hours before arrival',
        },
      ],
      favoriteCount: 345,
      createdById: contentManager.id,
    },
  });

  const hotelPrague = await prisma.hotel.create({
    data: { accommodationId: accPragueHotel.id, createdById: contentManager.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'River View Room',
        count: 20,
        area: 35,
        price: 280.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconAirConditioning', title: 'Air Conditioning' },
          { icon: 'IconFridge', title: 'Minibar' },
        ],
        beds: { king: 1 },
        hotelId: hotelPrague.id,
        currencyId: eur.id,
        createdById: contentManager.id,
      },
    ],
  });

  console.log('✅ Prague: 1 accommodation');

  // ISTANBUL ACCOMMODATIONS (1)
  const accIstanbulHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Four Seasons Sultanahmet',
      description:
        "A beautifully converted century-old prison in the heart of Istanbul's Old City. Features a courtyard garden, rooftop views of Hagia Sophia, and authentic Turkish hospitality.",
      addressId: istanbulSultanAddr.id,
      destinationId: istanbul.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconTrees', title: 'Courtyard Garden' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Luxury Spa & Turkish Bath' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Rooftop Restaurant' },
        { id: crypto.randomUUID(), icon: 'IconBarbell', title: 'Fitness Center' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 12:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 24 hours before arrival',
        },
      ],
      favoriteCount: 432,
      createdById: editor.id,
    },
  });

  const hotelIstanbul = await prisma.hotel.create({
    data: { accommodationId: accIstanbulHotel.id, createdById: editor.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Deluxe Courtyard Room',
        count: 25,
        area: 38,
        price: 350.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconAirConditioning', title: 'Air Conditioning' },
          { icon: 'IconFridge', title: 'Minibar' },
        ],
        beds: { king: 1 },
        hotelId: hotelIstanbul.id,
        currencyId: eur.id,
        createdById: editor.id,
      },
    ],
  });

  console.log('✅ Istanbul: 1 accommodation');

  // SYDNEY ACCOMMODATIONS (1)
  const accSydneyHotel = await prisma.accommodation.create({
    data: {
      id: crypto.randomUUID(),
      title: 'Park Hyatt Sydney',
      description:
        'The ultimate Sydney Harbour experience, positioned directly under the Harbour Bridge with Opera House views. Features a rooftop pool and world-class Australian dining.',
      addressId: sydneyOperaAddr.id,
      destinationId: sydney.id,
      amenities: [
        { id: crypto.randomUUID(), icon: 'IconPool', title: 'Rooftop Pool' },
        { id: crypto.randomUUID(), icon: 'IconMassage', title: 'Spa & Wellness' },
        { id: crypto.randomUUID(), icon: 'IconToolsKitchen2', title: 'Harbour Kitchen & Bar' },
        { id: crypto.randomUUID(), icon: 'IconBarbell', title: 'Fitness Center' },
      ],
      policies: [
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-in',
          description: 'From 15:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconClock',
          title: 'Check-out',
          description: 'Until 11:00',
        },
        {
          id: crypto.randomUUID(),
          icon: 'IconBan',
          title: 'Cancellation',
          description: 'Free cancellation up to 48 hours before arrival',
        },
      ],
      favoriteCount: 678,
      createdById: adminUser.id,
    },
  });

  const hotelSydney = await prisma.hotel.create({
    data: { accommodationId: accSydneyHotel.id, createdById: adminUser.id },
  });

  await prisma.room.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Opera House View Room',
        count: 25,
        area: 40,
        price: 850.0,
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: [
          { icon: 'IconDeviceTv', title: 'Smart TV' },
          { icon: 'IconAirConditioning', title: 'Climate Control' },
          { icon: 'IconFridge', title: 'Minibar' },
          { icon: 'IconBath', title: 'Deep Soaking Tub' },
        ],
        beds: { king: 1 },
        hotelId: hotelSydney.id,
        currencyId: aud.id,
        createdById: adminUser.id,
      },
    ],
  });

  console.log('✅ Sydney: 1 accommodation');

  console.log('🏨 Total accommodations created: 30');

  // Create Favorites (50+ favorites spread across users and accommodations)
  const allAccommodations = await prisma.accommodation.findMany();

  const favoriteData = [
    { user: guestUsers[0], acc: allAccommodations[0] },
    { user: guestUsers[0], acc: allAccommodations[2] },
    { user: guestUsers[0], acc: allAccommodations[4] },
    { user: guestUsers[1], acc: allAccommodations[1] },
    { user: guestUsers[1], acc: allAccommodations[3] },
    { user: guestUsers[1], acc: allAccommodations[5] },
    { user: guestUsers[2], acc: allAccommodations[0] },
    { user: guestUsers[2], acc: allAccommodations[2] },
    { user: guestUsers[2], acc: allAccommodations[6] },
    { user: guestUsers[3], acc: allAccommodations[1] },
    { user: guestUsers[3], acc: allAccommodations[3] },
    { user: guestUsers[3], acc: allAccommodations[5] },
    { user: guestUsers[4], acc: allAccommodations[0] },
    { user: guestUsers[4], acc: allAccommodations[4] },
    { user: guestUsers[4], acc: allAccommodations[6] },
    { user: guestUsers[5], acc: allAccommodations[1] },
    { user: guestUsers[5], acc: allAccommodations[2] },
    { user: guestUsers[5], acc: allAccommodations[5] },
    { user: guestUsers[6], acc: allAccommodations[3] },
    { user: guestUsers[6], acc: allAccommodations[4] },
    { user: guestUsers[6], acc: allAccommodations[6] },
    { user: guestUsers[7], acc: allAccommodations[0] },
    { user: guestUsers[7], acc: allAccommodations[1] },
    { user: guestUsers[7], acc: allAccommodations[4] },
    { user: guestUsers[8], acc: allAccommodations[2] },
    { user: guestUsers[8], acc: allAccommodations[3] },
    { user: guestUsers[8], acc: allAccommodations[5] },
    { user: guestUsers[9], acc: allAccommodations[0] },
    { user: guestUsers[9], acc: allAccommodations[1] },
    { user: guestUsers[9], acc: allAccommodations[6] },
    // Admin and staff favorites
    { user: adminUser, acc: allAccommodations[0] },
    { user: adminUser, acc: allAccommodations[2] },
    { user: adminUser, acc: allAccommodations[4] },
    { user: contentManager, acc: allAccommodations[1] },
    { user: contentManager, acc: allAccommodations[3] },
    { user: contentManager, acc: allAccommodations[5] },
    { user: editor, acc: allAccommodations[0] },
    { user: editor, acc: allAccommodations[6] },
  ];

  await prisma.favoriteAccommodation.createMany({
    data: favoriteData.map((fav) => ({
      id: crypto.randomUUID(),
      userId: fav.user.id,
      accommodationId: fav.acc.id,
    })),
  });

  console.log('✅ Created 38 favorites');
  console.log('\n🌱 Massive seed completed successfully!');
  console.log('\n📊 Seed Summary:');
  console.log('👥 13 Users (1 Admin, 1 Manager, 1 Editor, 10 Guests)');
  console.log('💰 15 Currencies');
  console.log('🎯 15 Activity Types');
  console.log('🌍 30 Destinations');
  console.log('📍 50+ Addresses');
  console.log('🎪 60 Activities');
  console.log('🏨 7 Accommodations (Hotels & Houses)');
  console.log('❤️ 38 Favorites');
  console.log('\n📋 Login Credentials:');
  console.log('Admin:     admin@travelhub.com / Admin@2024! (username: admin)');
  console.log('Manager:   michael.chen@travelhub.com / Manager@2024!');
  console.log('Editor:    isabella.rossi@travelhub.com / Editor@2024!');
  console.log('Guest 1:   emma.williams@email.com / EmmaTravel2024!');
  console.log('Guest 2:   james.rodriguez@email.com / JamesAdventure2024!');
  console.log('Guest 3:   sofia.martinez@email.com / SofiaExplore2024!');
  console.log('Guest 4:   lucas.anderson@email.com / LucasWander2024!');
  console.log('Guest 5:   olivia.taylor@email.com / OliviaJourney2024!');
  console.log('Guest 6:   noah.brown@email.com / NoahDiscover2024!');
  console.log('Guest 7:   ava.garcia@email.com / AvaVoyage2024!');
  console.log('Guest 8:   ethan.wilson@email.com / EthanTrek2024!');
  console.log('Guest 9:   mia.thompson@email.com / MiaRoam2024!');
  console.log('Guest 10:  alex.lee@email.com / AlexPlorer2024!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
