const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@constants': path.resolve(__dirname, 'src/utils/constants'),
      '@enums': path.resolve(__dirname, 'src/utils/enums'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  },
  devServer: {
    open: false
  }
};
