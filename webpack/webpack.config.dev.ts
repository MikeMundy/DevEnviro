import * as webpack from "webpack";
import * as path from 'path';
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {  

  devtool: "inline-source-map",

  entry: {
    'index': ['event-source-polyfill', 'react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true', path.resolve(__dirname, '../src/index.tsx')],
  },

  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  },
  plugins: [
    //Set to debug mode.
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'), // This is flag to use non-minimised version of React with hot relaoding... definitely not for production, but sweet for dev.
        // NODE_ENV: JSON.stringify('remote_dev'), // This is to access dev mode, exposed at my machine's IP address.
      }
    }),

    // Provide plugin to pop in es-promise-promise Promise object polyfill (for IE) whenever Promise is referred to.
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: true
    }),

    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, exclude: /node_modules/, loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader'] },
      { test:/\.(s*)css$/, loaders: ['style-loader','css-loader', 'sass-loader'] }, 
      { test: /\.(png|jpg)$/, loader: 'url-loader' },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=fonts/[name].[ext]' },
    ]
  }

}

export default config;