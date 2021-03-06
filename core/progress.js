const rp = require('request-promise-native');
const debug = require('debug')('UnicornTranscoder:progress');
const config = require('../config');

class Progress {
    static progress(req, res) {
        if (typeof req.headers === 'object')
            if ('host' in req.headers)
                delete req.headers.host;

        rp({
            method: req.method,
            url: `${config.loadbalancer_address}${req.url}`,
            headers: req.headers
        })
            .then(() => {
                if (!req.connection.destroyed)
                    res.send('');
            })
            .catch((err) => {
                if (!req.connection.destroyed)
                    res.send('');
            });
    }

    static log(req, res) {
        if (typeof req.headers === 'object')
            if ('host' in req.headers)
                delete req.headers.host;

        debug(`[${req.query.source}:${req.query.level}]: ${req.query.message}`);
        rp({
            method: req.method,
            url: `${config.loadbalancer_address}${req.url}`,
            headers: req.headers
        })
            .then(() => {
                if (!req.connection.destroyed)
                    res.send('');
            })
            .catch((err) => {
                if (!req.connection.destroyed)
                    res.send('');
            });
    }
}

module.exports = Progress;