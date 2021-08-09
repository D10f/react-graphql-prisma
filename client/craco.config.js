const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@constants': path.resolve(__dirname, 'src/utils/constants'),
      '@enums': path.resolve(__dirname, 'src/utils/enums'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    }
  },
  devServer: {
    open: false
  }
};
