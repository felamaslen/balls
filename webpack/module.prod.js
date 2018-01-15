const sassLoader = require('./sassLoader');

const moduleConfig = require('./module.common');

module.exports = (ExtractNormalCSS, ExtractFontsCSS) => ({
    ...moduleConfig,
    loaders: [
        ...moduleConfig.loaders,
        {
            test: /\.js$/,
            enforce: 'pre',
            exclude: /node_modules/,
            loaders: `strip-loader?${JSON.stringify({ env: ['DEV'] })}!eslint-loader`
        },
        {
            test: /\.scss$/,
            exclude: [/fonts\.scss$/, /node_modules/],
            loaders: ExtractNormalCSS.extract(sassLoader())
        },
        {
            test: /fonts\.scss$/,
            exclude: /node_modules/,
            loaders: ExtractFontsCSS.extract('css-loader!sass-loader')
        }
    ]
});

