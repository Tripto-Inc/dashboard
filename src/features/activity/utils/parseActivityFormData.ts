export const parseActivityFormData = async (formData: FormData) => {
  const get = (key: string) => formData.get(key)?.toString() || '';
  const getBool = (key: string) => formData.get(key) === 'true';
  const getNumber = (key: string) => parseFloat(get(key)) || 0;

  return {
    title: get('title'),
    price: getNumber('price'),
    discount: getNumber('discount'),
    isActive: getBool('isActive'),
    currencyId: get('currencyId'),
    activityTypeId: get('activityTypeId'),
    city: get('city'),
    country: get('country'),
    addressDetails: get('addressDetails'),
    countryCode: get('countryCode'),
    heroImage: formData.get('heroImage') as File | null,
  };
};
