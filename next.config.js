const path = require('path');

const DotenvFlow = require('dotenv-flow-webpack');
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

const nextConfig = {
  target: 'server',
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins.push(new DotenvFlow({
      path: path.join(__dirname, '.env'),
      systemvars: true
    }));

    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    });

    return config;
  }
};

module.exports = withPlugins([
  [
    withSass, {}
  ], [
    withCss, {}
  ]
], nextConfig);
