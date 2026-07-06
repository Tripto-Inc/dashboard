export const parseHouseFormData = (formData: FormData) => {
  const get = (key: string) => formData.get(key)?.toString() || '';
  const getNumber = (key: string) => parseFloat(get(key)) || 0;
  const getJSON = (key: string) => {
    const raw = get(key);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  return {
    title: get('title'),
    description: get('description'),
    city: get('city'),
    country: get('country'),
    addressDetails: get('addressDetails'),
    countryCode: get('countryCode'),
    latitude: parseFloat(get('latitude')) || undefined,
    longitude: parseFloat(get('longitude')) || undefined,
    policies: getJSON('policies'),
    amenities: getJSON('amenities'),
    availableDates: getJSON('availableDates'),
    price: getNumber('price'),
    discount: getNumber('discount'),
    capacity: getNumber('capacity'),
    area: getNumber('area'),
    floors: getNumber('floors'),
    bedrooms: getNumber('bedrooms'),
    bathrooms: getNumber('bathrooms'),
    tagId: get('tagId'),
    currencyId: get('currencyId'),
    heroImage: formData.get('heroImage') as File | null,
    galleryImages: formData.getAll('galleryImages') as File[],
  };
};
