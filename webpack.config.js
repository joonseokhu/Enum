require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const banner = `Enum
@author Joonseok <joonseok.hu@gmail.com>
@license MIT`

module.exports = () => {
  const configForWeb = {
    target: 'web',
    output: {
      filename: '[name].min.js',
      library: 'Enum',
      libraryTarget: 'umd',
      libraryExport: 'default',
      sourceMapFilename: '[name].min.js.map',
      path: path.resolve(__dirname, 'dist'),
    },
  };

  const configForNode = {
    target: 'node',
    output: {
      filename: '[name].node.min.js',
      library: 'Enum',
      libraryTarget: 'umd',
      libraryExport: 'default',
      sourceMapFilename: '[name].node.min.js.map',
      path: path.resolve(__dirname, 'dist')
    },
  };

  const entry = {
    Enum: './src/index.js',
  };

  const optimization = {
    minimize: true,
  };

  const module = {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  };

  const plugins = [
    (new webpack.BannerPlugin(banner)),
  ];

  const commonConfig = {
    entry,
    optimization,
    module,
    plugins,
    devtool: 'source-map'
  }

  return [configForWeb, configForNode].map(conf => ({
    ...commonConfig,
    ...conf,
  }));
};