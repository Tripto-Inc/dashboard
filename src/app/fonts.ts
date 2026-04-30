import localFont from 'next/font/local';

export const urbanist = localFont({
    src: [
        // Regular weights
        { path: '../assets/fonts/urbanist/Urbanist-Regular.ttf', weight: '100', style: 'normal' },
        { path: '../assets/fonts/urbanist/Urbanist-ExtraLight.ttf', weight: '200', style: 'normal' },
        { path: '../assets/fonts/urbanist/Urbanist-Light.ttf', weight: '300', style: 'normal' },
        { path: '../assets/fonts/urbanist/Urbanist-Regular.ttf', weight: '400', style: 'normal' },
        { path: '../assets/fonts/urbanist/Urbanist-Medium.ttf', weight: '500', style: 'normal' },
        { path: '../assets/fonts/urbanist/Urbanist-SemiBold.ttf', weight: '600', style: 'normal' },
        { path: '../assets/fonts/urbanist/Urbanist-Bold.ttf', weight: '700', style: 'normal' },
        { path: '../assets/fonts/urbanist/Urbanist-ExtraBold.ttf', weight: '800', style: 'normal' },
        { path: '../assets/fonts/urbanist/Urbanist-Black.ttf', weight: '900', style: 'normal' },

        // Italic weights
        { path: '../assets/fonts/urbanist/Urbanist-ThinItalic.ttf', weight: '100', style: 'italic' },
        { path: '../assets/fonts/urbanist/Urbanist-ExtraLightItalic.ttf', weight: '200', style: 'italic' },
        { path: '../assets/fonts/urbanist/Urbanist-LightItalic.ttf', weight: '300', style: 'italic' },
        { path: '../assets/fonts/urbanist/Urbanist-Italic.ttf', weight: '400', style: 'italic' },
        { path: '../assets/fonts/urbanist/Urbanist-MediumItalic.ttf', weight: '500', style: 'italic' },
        { path: '../assets/fonts/urbanist/Urbanist-SemiBoldItalic.ttf', weight: '600', style: 'italic' },
        { path: '../assets/fonts/urbanist/Urbanist-BoldItalic.ttf', weight: '700', style: 'italic' },
        { path: '../assets/fonts/urbanist/Urbanist-ExtraBoldItalic.ttf', weight: '800', style: 'italic' },
        { path: '../assets/fonts/urbanist/Urbanist-BlackItalic.ttf', weight: '900', style: 'italic' },
    ],
    variable: '--font-urbanist', // optional, for CSS variable
    display: 'swap',
});