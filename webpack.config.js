/* eslint-disable global-require */
/**
 * Returns webpack configuration objects
 */

const dotenv = require('dotenv');

if (process.env.DOTENV_INJECT === 'true' || process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractNormalCSS = new ExtractTextPlugin({
    filename: 'css/style.css',
    allChunks: true
});
const ExtractFontsCSS = new ExtractTextPlugin({
    filename: 'css/fonts.css',
    allChunks: true
});

function webpackConfig() {
    if (process.env.NODE_ENV === 'production') {
        return require('./webpack/conf.prod')(ExtractNormalCSS, ExtractFontsCSS);
    }

    return require('./webpack/conf.dev')();
}

module.exports = () => webpackConfig();

