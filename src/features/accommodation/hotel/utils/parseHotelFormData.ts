export const parseHotelFormData = async (formData: FormData) => {
  const dataRaw = formData.get('data')?.toString();
  if (!dataRaw) throw new Error('Missing "data" field');
  const data = JSON.parse(dataRaw);

  const heroImage = formData.get('heroImage') as File | null;
  const galleryImages = formData.getAll('galleryImages') as File[];

  const roomsCount = data.rooms?.length || 0;
  const roomsGalleryImages: File[][] = [];
  for (let i = 0; i < roomsCount; i++) {
    const files = formData.getAll(`roomsGalleryImages_${i}`) as File[];
    roomsGalleryImages.push(files);
  }

  return { data, heroImage, galleryImages, roomsGalleryImages };
};
