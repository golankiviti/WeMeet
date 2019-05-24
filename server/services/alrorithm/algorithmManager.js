const CronJob = require('cron').CronJob,
    _ = require('lodash'),
    Promise = require('bluebird'),
    Moment = require('moment'),
    momentRange = require('moment-range');

const moment = momentRange.extendMoment(Moment);

const logger = require('../../utils/logger');

const {
    meetings,
    restrictions
} = require('../../data/index').schemas;

const algorithm = require('./algorithmHandler').startAlgorithm;

const CRON_TIME = process.env.CRON_TIME || '0 0 * * *'; // default to every day at midnight

const MIN_HOUR = process.env.ALGORITHM_MIN_HOUR || 8,
    MAX_HOUR = process.env.ALGORITHM_MAX_HOUR || 22

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
    logger.debug('start greedy algorithm');
    meeting.isDetermined = true;
    let meetingFromDate = moment(meeting.fromDate),
        meetingToDate = moment(meeting.toDate),
        currentMeetingCheckDate = moment(meetingFromDate),
        bestMeetingDate = moment(meetingFromDate);
    let meetingQuery = {
            $and: [{
                fromDate: {
                    $gte: meetingFromDate.toDate()
                }
            }, {
                toDate: {
                    $lte: meetingToDate.toDate()
                }
            }, {
                isDetermined: true
            }]
        },
        restrictionQuery = {
            $and: [{
                startDate: {
                    $gte: meetingFromDate.toDate()
                }
            }, {
                endDate: {
                    $lte: meetingToDate.toDate()
                }
            }]
        };
    let relevantMeetings, relevantRestrictions;
    logger.debug('get all relevant meeting for the algorithm')
    return meetings.find(meetingQuery).lean()
        .then((meets) => {
            relevantMeetings = meets;
            logger.debug('get all relevant restriction for the algorithm');
            return restrictions.find(restrictionQuery).lean();
        })
        .then((resticts) => {
            relevantRestrictions = resticts;
            let foundSolution = false,
                actualMeetingToDate = moment(currentMeetingCheckDate).add(meeting.meetLengthInSeconds, 's'),
                bestScore = Infinity;
            meeting.actualDate = currentMeetingCheckDate;
            logger.debug('start to search for the best meeting date');
            while (!foundSolution && actualMeetingToDate.isBefore(meetingToDate)) {
                let currentMeetingScore = _fitness(meeting, relevantRestrictions, relevantMeetings);
                if (currentMeetingScore === 0) {
                    logger.debug('found time with score 0!')
                    foundSolution = true;
                    bestMeetingDate = meeting.actualDate;
                } else if (currentMeetingScore < bestScore) {
                    bestScore = currentMeetingScore;
                    bestMeetingDate = meeting.actualDate;
                }
                meeting.actualDate = currentMeetingCheckDate.add(30, 'minutes');
                actualMeetingToDate = moment(meeting.actualDate).add(meeting.meetLengthInSeconds, 's');
            }
            meeting.actualDate = bestMeetingDate;
            let newMeeting = new meetings(meeting);
            return newMeeting.save();
        });
};

function _fitness(meeting, restrictions, meetings) {
    let fitnessScore = 0;

    meeting.actualDate = moment(meeting.actualDate);
    meeting.fromDate = moment(meeting.fromDate);
    meeting.toDate = moment(meeting.toDate);
    let meetingActualEndTime = moment(meeting.actualDate).add(meeting.meetLengthInSeconds, 'seconds');
    // in case the actualDate is not in the range of fromDate and toDate
    if (!(meeting.actualDate.isSameOrAfter(meeting.fromDate) &&
            meetingActualEndTime.isSameOrBefore(meeting.toDate))) {
        // add to score the number of invited 
        fitnessScore += meeting.invited.length * 2;
        // in case the meeting want to be at night
    } else if ((MAX_HOUR < meeting.actualDate.hour() || meeting.actualDate.hour() < MIN_HOUR) ||
        MAX_HOUR < meetingActualEndTime.hour() || meetingActualEndTime.hour() < MIN_HOUR) {
        // no chance to choose this solution
        fitnessScore += Infinity;
    } else {
        // check here all the meetings and restrictions that are in the range of the current meeting
        // create dictionary of all invited.
        let invitedDict = {};

        _.each(meeting.invited, (user) => {
            // right now every user can go to the meeting
            invitedDict[user] = true;
        });
        // run over all restrictions
        _.each(restrictions, (restrict) => {
            restrict.user = restrict.user.toString();
            // in case this restriction is not relevant to any of our invited
            if (_.indexOf(meeting.invited, restrict.user) === -1) return;

            // in case the restrict date and meeting date are overlaps
            if (isDatesOverlap(restrict.startDate, restrict.endDate, meeting.actualDate, meetingActualEndTime)) {
                // the current invited can not go to meeting
                invitedDict[restrict.user] = false;
                return false;
            }
        });

        // in case we found all invited can not be in meeting because of restriction,
        // we skip over the meeting search
        if (_.every(Object.keys(invitedDict), false)) {
            fitnessScore += meeting.invited.length;
            return;
        }

        // run over all relevant meeting
        _.each(meetings, (relevantMeeting) => {
            let relevantMeetingActualEndDate = moment(relevantMeeting.actualDate).add(relevantMeeting.meetLengthInSeconds, 'seconds');
            // in case the relevant meeting is overlap
            if (isDatesOverlap(relevantMeeting.actualDate, relevantMeetingActualEndDate, meeting.actualDate, meetingActualEndTime)) {
                _.each(relevantMeeting.invited, (relevantMeetingInvited) => {
                    if (_.indexOf(meeting.invited, relevantMeetingInvited.toString()) !== -1) {
                        invitedDict[relevantMeetingInvited] = false;
                    }
                });
            }
        });
        let numOfInvitedCanNotGoToMeeting = 0;
        _.each(invitedDict, (value) => {
            if (!value) numOfInvitedCanNotGoToMeeting++;
        });
        fitnessScore += numOfInvitedCanNotGoToMeeting / meeting.invited.length;
    }
    console.log(`score:${fitnessScore}`);
    return fitnessScore;
}

const isDatesOverlap = (startDateOne, endDateOne, startDateTwo, endDateTwo) => {
    let rangeOne = moment.range(moment(startDateOne), moment(endDateOne)),
        rangeTwo = moment.range(moment(startDateTwo), moment(endDateTwo));
    return rangeOne.overlaps(rangeTwo, {
        adjacent: false // not include
    });
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