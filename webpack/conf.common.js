const path = require('path');

const plugins = require('./plugin.common');

module.exports = {
    entry: ['babel-polyfill', './src/index'],
    output: {
        path: path.join(__dirname, '../static'),
        filename: 'js/bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins
};

