const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],

  theme: {
    screens: {
      si: '769px',
      md: '900px',
      lg: '1025px',
      xxl: '1341px',
      xl: '1500px', // this is the "design resolution",
      max: '1919px',
      maxw: { max: '1603px' },
      m2xl: { max: '1340px' },
      mxl: { max: '1200px' },
      mlg: { max: '1024px' },
      mmd: { max: '768px' },
      msm: { max: '375px' },
      mmax: { max: '1919px' },
    },
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      Cabin: ['Cabin', 'sans-serif'],
    },

    keyframes: {
      flicker: {
        '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
          opacity: 0.99,
          filter:
            'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
        },
        '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
          opacity: 0.4,
          filter: 'none',
        },
      },
      tilt: {
        '0%, 50%, 100%': {
          transform: 'rotate(0deg)',
        },
        '25%': {
          transform: 'rotate(0.5deg)',
        },
        '75%': {
          transform: 'rotate(-0.5deg)',
        },
      },
    },
    animation: {
      flicker: 'flicker 3s linear infinite',
      tilt: 'tilt 10s infinite linear',
    },
    extend: {
      colors: {
        'main-text': '#1f2d3d',
        'banner-color': '#7e5bef',
        'regal-sky': '#1fb6ff',
        'small-text': '#3c4858',
        'white-m': '#F5F7F9',
        'white-s': '#bec8d1',
        'grey-m': '#A0B5BB',
        'greyTint-m': '#70768C',
        'green-m': '#18A76C',
        'grrenTint-m': '#6CD2B0',
        'dark-m': '#323747',
        'orange-m': '#D7593D',
        'dark-bg': '#3a3d4a',
      },
      maxWidth: {
        '9xl': '82.5rem',
        '8xl': '96rem',
        side: '16.75rem',
        main: '71.25rem',
        card: '22.40625rem',
      },
      fontSize: {
        xl: '1.375rem', // 22px
        '2xl': '1.5625rem', // 25px
        '3xl': '1.875rem', // 30px
        '4xl': '2.5rem', // 40px
        '5xl': '3.125rem', // 50px
        '6xl': '3.75rem', // 60px
        '7xl': '4.375rem', // 70px
      },
      spacing: {
        '5vw': '5vw', // pull featured sections and navbar in the margin
        '8vw': '8vw', // positions hero img inside the margin
        '10vw': '10vw', // page margin
        768: '768px',
        side: '16.375rem',
        'side-1': '14.75rem',
        main: '92.25rem',
        card: '24.15625rem',
        mcard: '25%',
        scard: '50%',
        scardX: '49.3125rem',
        tcard: ' 32.8%',
        tcardX: '32%',
        fcard: ' 100%',
      },
      height: {
        hero: 'min(60rem, calc(100vh - 10rem))', // screen - navbar height (lg: only)
        card: '20rem',
        single: '9.1rem',
      },
      maxHeight: {
        '50vh': '50vh', // max height for medium size hero images
        '75vh': '75vh', // max height for giant size hero images
      },
      rotate: {
        '-135': '-135deg',
        135: '135deg',
      },
      typography: theme => {
        const fontSize = size => {
          const result = theme(`fontSize.${size}`);
          return Array.isArray(result) ? result[0] : result;
        };

        const breakout = {
          marginLeft: 0,
          marginRight: 0,
          gridColumn: '2 / span 10',
        };
      },
    },
  },
  plugins: [],
};
