export const getLanguageName = (locale: string) => {
  const languageCode = locale.split('-')[0];

  return new Intl.DisplayNames([locale], {
    type: 'language',
  }).of(languageCode);
};
