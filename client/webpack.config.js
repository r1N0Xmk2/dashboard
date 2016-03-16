var config = {
  entry: [
    './app/main.jsx',
  ],
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
      loader: 'babel', // The module to load. "babel" is short for "babel-loader"
      exclude: /node_modules/,
      query: {
        presets:['es2015','react'],
      },
    }, {
      test: /\.css$/,
      loader: 'style!css',
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000',
    },
    // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
    {
      test: /bootstrap\/js\//,
      loader: 'imports?jQuery=jquery'
    },
      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&minetype=application/font-woff2"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&minetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&minetype=image/svg+xml"
    }],
  },
};

module.exports = config;
