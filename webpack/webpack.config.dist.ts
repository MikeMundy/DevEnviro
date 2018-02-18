import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as WebpackMd5Hash from "webpack-md5-hash";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as HtmlWebpackProcessingPlugin from "html-webpack-processing-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";

function sortChunks(chunkOrder, chunk1, chunk2) {
  var order1 = chunkOrder.indexOf(chunk1.names[0]);
  var order2 = chunkOrder.indexOf(chunk2.names[0]);
  return order1 - order2;
}

var htmlMinificationSettings = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
}

const config: webpack.Configuration = {  
devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, '../src/index'),
    // vendor: ['react', 'react-dom']
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  },
  plugins: [
    //Set to debug mode.
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    // Use minified production build of React.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production') // This is flag to use minimised version of React.
      }
    }),
    // Provide plugin to pop in es-promise-promise Promise object polyfill (for IE) whenever Promise is referred to.
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    }),
    // Generate an external css file with a hash in the filename
    //new ExtractTextPlugin('[name].css'),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    // Hash the files using Md5 so that their names change when their content changes.
    new WebpackMd5Hash(),
    // Use CommonsChunkPlugin to create a seperate bundle of vendor libraries so that they will be cached separately.
    new webpack.optimize.CommonsChunkPlugin({
       names: ['vendor']
    }),

    //Create 'home pages' for each of the React component types (plus the non-React 'index' example).

    // Create HTML file that includes reference to bundled JS. For index.html.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      minify: htmlMinificationSettings,
      // chunksSortMode: function (chunk1, chunk2) {  //TODO: check whether need this.
      //   return sortChunks(['vendor', 'index'], chunk1, chunk2);
      // },    
      // chunks: ['vendor', 'index'],
      inject: true
    }),

    // Minify js.
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        properties: true,  // If this is true, causes bugs in IE9 where reserved keyword default in e.default causes bug; this return e["default"] instead.
        dead_code: true,    // dead_code plus unused options enabled tree shaking to greatly reduce code size.
        unused: true
      }
    }),

  ],
  module: {
    rules: [
      { test: /\.(png|jpg)$/, loader: 'url-loader' },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'awesome-typescript-loader', options: { sourceMap: true, minimize: true } }]
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({ fallback: "style-loader", use: [{ loader: 'css-loader', options: { sourceMap: true, minimize: true } }] }),
      // },
      {
        test:/\.(s*)css$/,
        loader: ExtractTextPlugin.extract([{ loader: 'css-loader', options: { sourceMap: true, minimize: true } }, { loader: 'sass-loader', options: { sourceMap: true, minimize: true } }]),
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
    ]
  }
};

export default config;
