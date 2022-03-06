SPACING = {
  px: '1px',
  '0': '0',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '9': '36px',
  '10': '40px',
  '11': '44px',
  '12': '48px',
  '13': '52px',
  '14': '56px',
  '15': '60px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
  '28': '112px',
  '32': '128px',
  '36': '144px',
  '40': '160px',
  '44': '176px',
  '48': '192px',
  '52': '208px',
  '56': '224px',
  '60': '240px',
  '64': '256px',
  '72': '288px',
  '80': '320px',
  '96': '384px',
  '128': '512px',
  '256': '768px',
  '1200': '1200px',
  '1600': '1600px',
  'full': '100%',
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#4969c9",
        "secondary": "#b5b4e4",
        "highlight": "#dfafe9",
        "contrast": "#908aa8"
      },
      maxWidth: SPACING,
      height: SPACING,
      maxHeight: SPACING
    },
  },
  plugins: [],
}