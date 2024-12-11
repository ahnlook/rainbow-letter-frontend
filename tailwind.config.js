/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Noto Sans KR', 'sans-serif'],
      OwnglyphMinhyeChae: ['OwnglyphMinhyeChae'],
      Gyobomungo2019: ['Gyobomungo2019'],
      Pretendard: ['Pretendard'],
      HelveticaNowDisplay: ['HelveticaNowDisplay'],
    },
    extend: {
      width: {
        inherit: 'inherit',
      },
      fontSize: {
        'heading-1': ['1.875rem', { lineHeight: '130%', fontWeight: '600' }],
        'heading-1-pc': ['3rem', { lineHeight: '130%', fontWeight: '600' }],
        'heading-2': ['1.625rem', { lineHeight: '130%', fontWeight: '500' }],
        'heading-2-pc': ['2.25rem', { lineHeight: '130%', fontWeight: '500' }],
        'heading-3': ['1.25rem', { lineHeight: '130%', fontWeight: '500' }],
        'heading-3-pc': ['1.5rem', { lineHeight: '130%', fontWeight: '500' }],
        'solo-large': ['1.125rem', { lineHeight: '100%', fontWeight: '500' }],
        'solo-medium': ['1rem', { lineHeight: '100%' }],
        'solo-medium-pc': ['1rem', { lineHeight: '100%' }],
        'solo-small': ['0.875rem', { lineHeight: '100%' }],
        'solo-small-pc': ['0.875rem', { lineHeight: '100%' }],
        'solo-label': ['0.875rem', { lineHeight: '100%', fontWeight: '500' }],
        'solo-label-pc': ['1rem', { lineHeight: '100%', fontWeight: '500' }],
        'body-large': ['1.125rem', { lineHeight: '166%', fontWeight: '500' }],
        'body-medium': ['1rem', { lineHeight: '166%' }],
        'body-medium-pc': ['1.25rem', { lineHeight: '166%' }],
        'body-small': ['1rem', { lineHeight: '166%' }],
        'body-small-pc': ['0.875rem', { lineHeight: '166%' }],
        'body-letter': ['1.438rem', { lineHeight: '166%' }],
        'body-letter-pc': ['2.25rem', { lineHeight: '166%' }],
        caption: ['0.875rem', { lineHeight: '166%' }],
        'caption-pc': ['0.75rem', { lineHeight: '166%' }],
      },
      colors: {
        primary: '#FFB347',
        gray: {
          1: '#BDBDBD',
          2: '#F8F8F8',
          3: '#DFDFDF',
          4: '#DADADA',
          5: '#6D6D6D',
          6: '#F9F9F9',
          7: '#F0F0F0',
        },
        orange: {
          50: '#FFF8ED',
          100: '#FFF1D4',
          400: '#FFB74D',
        },
        alarm: {
          red: '#FB5660',
          blue: '#553FFE',
          50: '#FFDABF',
        },
        yellow: {
          50: '#FEF9ED',
        },
        green: {
          50: '#DDFFEB',
        },
      },
      textColor: {
        default: '#424242',
        gray: {
          1: '#616161',
          2: '#BDBDBD',
          3: '#656565',
          4: '#5F5F5F',
          5: '#989898',
        },
        green: {
          100: '#61BA84',
        },
        alarm: {
          50: '#FF7C1E',
        },
      },
      backgroundImage: {
        'nav-gradient':
          'linear-gradient(235deg, #FFB74D 24.66%, #FD9700 70.61%)',
        letterTimeBg: "url('./assets/im_letterBox_time.webp')",
      },
      boxShadow: {
        default: '0px 0px 10px 0px rgba(0, 0, 0, 0.15)',
        home: '0px 0px 5px 0px rgba(0, 0, 0, 0.15)',
        letter: '2px 2px 5px 0px rgba(0, 0, 0, 0.05)',
        modal: '0px 0px 6px 0px rgba(20, 20, 43, 0.10);',
        nav: '0 -5px 6px -5px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
};
