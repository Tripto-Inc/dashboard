import localFont from 'next/font/local';

export const figtree = localFont({
  src: [
    // Regular weights
    { path: '../assets/fonts/figtree/Figtree-Light.ttf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/figtree/Figtree-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/figtree/Figtree-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../assets/fonts/figtree/Figtree-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../assets/fonts/figtree/Figtree-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../assets/fonts/figtree/Figtree-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: '../assets/fonts/figtree/Figtree-Black.ttf', weight: '900', style: 'normal' },

    // Italic weights
    { path: '../assets/fonts/figtree/Figtree-LightItalic.ttf', weight: '300', style: 'italic' },
    { path: '../assets/fonts/figtree/Figtree-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../assets/fonts/figtree/Figtree-MediumItalic.ttf', weight: '500', style: 'italic' },
    {
      path: '../assets/fonts/figtree/Figtree-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    { path: '../assets/fonts/figtree/Figtree-BoldItalic.ttf', weight: '700', style: 'italic' },
    {
      path: '../assets/fonts/figtree/Figtree-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    { path: '../assets/fonts/figtree/Figtree-BlackItalic.ttf', weight: '900', style: 'italic' },
  ],
  variable: '--font-figtree',
  display: 'swap',
});
