/**
 * Main server app
 */

/* eslint-disable global-require */

require('dotenv').config();

const path = require('path');
const express = require('express');
const { version } = require('../package.json');

function server() {
    const app = express();

    app.set('views', path.join(__dirname, '../src/templates'));
    app.set('view engine', 'ejs');

    if (process.env.NODE_ENV === 'development') {
        const conf = require('../webpack.config')();

        const compiler = require('webpack')(conf);

        app.use(require('webpack-dev-middleware')(compiler, {
            publicPath: conf.output.publicPath,
            stats: {
                colors: true,
                modules: false,
                chunks: false,
                reasons: false
            },
            hot: true,
            quiet: false,
            noInfo: false
        }));

        app.use(require('webpack-hot-middleware')(compiler, {
            log: console.log
        }));
    }

    // put your API endpoints here (e.g. include an Express router from another file)

    // serve the react app statically
    app.use('/', express.static(path.join(__dirname, '../static')));

    app.get('/*', (req, res) => {
        res.render('index', {
            htmlWebpackPlugin: {
                options: {
                    version,
                    externalStyles: process.env.NODE_ENV !== 'development'
                }
            }
        });
    });

    // catch 404
    app.use((req, res) => {
        res.status(404).json({ error: true, msg: 'Not found' });
    });

    const port = process.env.PORT || 3000;

    return new Promise(resolve => {
        app.listen(port, () => {
            return resolve({ app, port });
        });
    });
}

module.exports = server;

