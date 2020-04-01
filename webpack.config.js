const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/typescript',
            ],
            plugins: [
              // 'react-hot-loader/babel',
              // ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-transform-runtime', { regenerator: true }],
              // ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
