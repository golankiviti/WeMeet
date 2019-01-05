const bunyan = require('bunyan'),
    bunyanFormat = require('bunyan-format');

const bstream = bunyanFormat({
    outputMode: 'long',
    colorFromLevel: {
        10: 'white',
        20: 'yellow',
        30: 'cyan',
        40: 'magenta',
        50: 'red',
        60: 'inverse'
    }
});

const logger = bunyan.createLogger({
    name: 'WeMeetServer',
    src: true,
    stream: bstream,
    level: 'trace'
});

module.exports = logger;