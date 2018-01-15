const path = require('path');
const plugins = require('./plugin.common');

module.exports = {
    entry: ['./src/index'],
    resolve: {
        modules: ['node_modules', path.join(__dirname, '../src/images/sprite')],
        extensions: ['*', '.js', '.json']
    },
    resolveLoader: {
        modules: ['node_modules', __dirname]
    },
    plugins
};

