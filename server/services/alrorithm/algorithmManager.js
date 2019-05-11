const CronJob = require('cron').CronJob,
    _ = require('lodash'),
    Promise = require('bluebird'),
    moment = require('moment');

const logger = require('../../utils/logger');

const meetings = require('../../data/index').schemas.meetings;

const algorithm = require('./algorithmHandler').startAlgorithm;

const CRON_TIME = process.env.CRON_TIME || '0 0 * * *'; // default to every day at midnight


const job = new CronJob({
    cronTime: CRON_TIME,
    onTick: geneticAlgorithm
});

function geneticAlgorithm() {
    logger.info('start genetic algorithm')
    return algorithm()
        .then((result) => {
            // run over all meetings in the result and update them according to algorithm result
            return Promise
                .map(result[0], meeting => {
                    return meetings.update({
                        _id: meeting._id
                    }, {
                        isDetermined: true,
                        actualDate: moment(meeting.actualDate).toDate()
                    });
                })
                .then(() => {
                    logger.info('finish genetic algorithm and update ')
                });
        })
        .catch((err) => {
            logger.error('error while execute the algorithm');
            logger.error(err);
        });
};

// greedy algorithm
const greedyAlgorithm = (meeting) => {
    meeting.isDetermined = true;
    meeting.actualDate = moment(meeting.fromDate);
    let newMeeting = new meetings(meeting);
    return newMeeting.save();
};

// get next algorithm run for the greedy algorithm
const getNextAlgorithmRunDate = () => {
    return moment(job.nextDates(1)[0]);
};

// force genetic algorithm to run and update meetings for tests
const forceRunGeneticAlgorithm = () => {
    return geneticAlgorithm();
};

// start the cronJob
const initCronJob = () => {
    return job.start();
};

module.exports = {
    initCronJob,
    getNextAlgorithmRunDate,
    forceRunGeneticAlgorithm,
    greedyAlgorithm
};