const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
    publicPath: '/public/', // Adjust this to match your asset server path if needed.
  },
  resolve: {
    fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      util: require.resolve('util'),
      fs: false,
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      path: require.resolve('path-browserify'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'public/images/[name][ext]' // Output images in the 'public/images' folder
        }
      },
      {
        test: /\.(ico|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'public/icons/[name][ext]' // Output icons in the 'public/icons' folder
        }
      },
      {
        test: /\.(woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'public/fonts/[name][ext]' // output icons in the 'public/fonts' folder
        }
      }
    ],
  },
  devtool: 'source-map',
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/locales', to: 'public/locales' }
      ],
    }),
  ],
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
        },
      }),
    ],
  },
};
