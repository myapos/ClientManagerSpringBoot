var path = require('path');
var webpack = require('webpack');
var node_dir = __dirname + '/node_modules';

module.exports = {
    // entry: [
   
    // require.resolve('react-dev-utils/webpackHotDevClient'),
    // 'webpack-dev-server/client?http://0.0.0.0:3001', // WebpackDevServer host and port
    //  './src/main/js/index.js',
    // ],
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    resolve: {
        alias: {
            'stompjs': node_dir + '/stompjs/lib/stomp.js',
        }
    },
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],

    module: {
    loaders: [{
        test: path.join(__dirname, '.'),
        exclude: /node_modules/,
        loaders: ['react-hot', 'jsx?harmony', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime']
        }
      ]
    }


    // module: {
    //     loaders: [
    //         {
    //             test: path.join(__dirname, '.'),
    //             exclude: /(node_modules)/,
    //             //loader: 'babel-loader',
    //             loaders: ['react-hot', 'jsx?harmony', 'babel-loader'],
    //             query: {
    //                 cacheDirectory: true,
    //                 presets: ['es2015', 'react']
    //             }
    //         }
    //     ]
    // }
};

// loaders: [{
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime']
//     }

