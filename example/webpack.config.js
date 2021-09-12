/* eslint-disable @typescript-eslint/no-var-requires */
const createExpoWebpackConfigAsync = require('@expo/webpack-config')
const path = require('path')

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  const webConfig = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  }

  config.module.rules = [...config.module.rules, webConfig]

  //   const alias = {
  //     react: path.join(__dirname, '../node_modules/react'),
  //     'react-dom': path.join(__dirname, '../node_modules/react-dom'),
  //     'react-native': path.join(__dirname, '../node_modules/react-native'),
  //     'react-native-web': path.join(
  //       __dirname,
  //       '../node_modules/react-native-web'
  //     ),
  //   }

  //   config.resolve.alias = alias

  return config
}
