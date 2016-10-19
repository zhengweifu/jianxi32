var webpack = require('webpack');
var path = require('path');

var htmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.NODE_ENV;

var config = {
    // cache: true,
    entry: {
        // react: './src/react/App.js',
        jy: './src/Home/jy/index.js',
        dlz: './src/Home/dlz/index.js'
        // testing: './src/Common/testing/testing.js'
    },

    output: {
        path: __dirname + '/dist',
        filename: '[name].server.bundle.js'
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss', 'jpg', 'png']
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'three': 'THREE',
        'fabric': 'fabric'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }, {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }, {
                test: /\.(jpg|png)$/,
                loader: 'url?limit=8192?name=dist/[hash:8].[name].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new webpack.NoErrorsPlugin(),
        // new htmlWebpackPlugin({
        //     titile: '简易工具'
        // })
    ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  );
} else {
    config['devtool'] = 'eval-source-map';// devtool: 'inline-source-map',
}

module.exports = config;
