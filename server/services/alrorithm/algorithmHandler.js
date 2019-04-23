const {
    fork
} = require('child_process');

const {
    meetings
} = require('../../data').schemas;

const logger = require('../../utils/logger');

// here we will get all the meeting we want set from the db,
// then we will send it to the algorithemExecuter
const startAlgorithm = () => {
    return new Promise((resolve, reject) => {
        // in case we are in debug mode
        let debugPort;
        let isDebugMode = process.execArgv.findIndex((val) => {
            return val.includes('--inspect-brk');
        });
        // get the port in debug mode to pipe it to child
        if (isDebugMode !== -1) {
            debugPort = process.execArgv[isDebugMode].split('=')[1];
        }

        // response from child variables
        let gotResponseFromchild = false,
            response = [];

        let query = {
            // all meetings that are not deterined yet
            isDetermined: false
        }
        // we need to get all meetings that are relevant for the algorithm
        meetings.find(query)
            .then((meetings) => {
                // prepare some option for the child process
                let childOptions = {
                    // pipe the stdio to the parent
                    stdio: 'pipe',
                    execArgv: []
                };
                // in case we are in debug mode
                if (isDebugMode !== -1) {
                    childOptions.execArgv.push(`--inspect-brk=${parseInt(debugPort) + 1}`)
                }
                // start the algorithm
                let child = fork(`${__dirname}/algorithmExecuter.js`, childOptions);
                // in case our child finish it job
                child.on('exit', (exitCode) => {
                    // in case the child exit with code different from 0
                    // it mean the child didnt exit propely
                    if (exitCode !== 0) {
                        return reject(new Error(`child algorithm exit with code ${exitCode}`));
                    }
                    // in case the child exit with code 0 but didnt send us result
                    if (!gotResponseFromchild) {
                        return reject(new Error(`child exit with code ${exitCode}, but didnt send response`));
                    }
                    return resolve(response);
                });
                // in case we got error from fork the child
                child.on('error', (err) => {
                    logger.warn(`error eccured while fork the child`);
                    return reject(err);
                });
                // in case we got the result from the child
                child.on('message', (message) => {
                    logger.debug('got result from child', message);
                    response = message;
                    gotResponseFromchild = true;
                });
                // get the stdout of child and log it
                child.stdout.on('data', (output) => {
                    logger.debug(output.toString().trim());
                });
                // get the stderr of child and log it
                // child.stderr.on('data', (output) => {
                //     logger.warn(output.toString());
                // });
                // send to child the meetings
                child.send(meetings);
            });
    });
};

module.exports = startAlgorithm;