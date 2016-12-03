module.exports = {
  entry: './src/index.js',
  output: {
    path: './public/',
    filename: 'index.js'
  },
  devServer: {
    contentBase: './public',
    inline: true,
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            "transform-es2015-destructuring",
            "transform-object-rest-spread"
          ]
        }
      },
      { 
        test: /\.css$/, 
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ] 
      },
      { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" 
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  postcss: function () {
    return [
      require('postcss-cssnext'),
      require('autoprefixer')
    ];
  }
}