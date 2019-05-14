const CronJob = require('cron').CronJob,
    _ = require('lodash'),
    Promise = require('bluebird'),
    moment = require('moment');

const logger = require('../../utils/logger');

const {meetings,restrictions} = require('../../data/index').schemas;

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
    let meetingFromDate = moment(meeting.fromDate),
        meetingToDate = moment(meeting.toDate),
        currentMeetingCheckDate = moment(meetingFromDate),
        bestMeetingDate = moment(meetingFromDate);
    let meetingQuery = {},
        restrictionQuery = {};
    let relevantMeetings,relevantRestrictions;
    return meetings.find(meetingQuery).lean()
        .then((meets)=>{
            relevantMeetings = meets;
            return restrictions.find(restrictionQuery).lean();
        })
        .then((resticts)=>{
            relevantRestrictions = resticts;
            let foundSolution = false;
            let actualMeetingToDate = moment(currentMeetingCheckDate).add(meeting.meetLengthInSeconds,'s');
            while(!foundSolution && actualMeetingToDate.isBefore(meetingToDate)){

            }
        });
    meeting.actualDate = moment(meeting.fromDate);
    let newMeeting = new meetings(meeting);
    return newMeeting.save();
};

function _fitness(){
    console.log(`fitnessRun:${++fitnessCount}`);
    let fitnessScore = 0;
    // run over all meeting in the individual
    _.each(individual, (meeting) => {
        meeting.actualDate = moment(meeting.actualDate);
        meeting.fromDate = moment(meeting.fromDate);
        meeting.toDate = moment(meeting.toDate);
        let meetingActualEndTime = moment(meeting.actualDate).add(meeting.meetLengthInSeconds, 'seconds');
        // in case the actualDate is not in the range of fromDate and toDate
        if (!(meeting.actualDate.isSameOrAfter(meeting.fromDate) &&
                meetingActualEndTime.isSameOrBefore(meeting.toDate))) {
            // add to score the number of invited 
            fitnessScore += meeting.invited.length * 2;
        } else {
            // check here all the meetings and restrictions that are in the range of the current meeting
            // create dictionary of all invited.
            let invitedDict = {},
                relevantMeetings;
            _.each(meeting.invited, (user) => {
                // right now every user can go to the meeting
                invitedDict[user] = true;
            });
            // run over all restrictions
            _.each(data.restrictions, (restrictObject) => {
                // in case this restriction is not relevant to any of our invited
                if (_.indexOf(meeting.invited, restrictObject.userId) === -1) return;
                // run over all the restiction of the inveted and check if it intersact our meeting
                _.each(restrictObject.userRestrictions, (restrict) => {
                    // in case the restrict date and meeting date are overlaps
                    if (isDatesOverlap(restrict.startDate, restrict.endDate, meeting.actualDate, meetingActualEndTime)) {
                        // the current invited can not go to meeting
                        invitedDict[restrictObject.userId] = false;
                        return false;
                    }
                });
            });

            // in case we found all invited can not be in meeting because of restriction,
            // we skip over the meeting search
            if (_.every(Object.keys(invitedDict), false)) {
                fitnessScore += meeting.invited.length;
                return;
            }

            // get all relevant meetings
            relevantMeetings = getRelevantMeetingForMeeting(individual, meeting);
            // run over all relevant meeting
            _.each(relevantMeetings, (relevantMeeting) => {
                let relevantMeetingActualEndDate = moment(relevantMeeting.actualDate).add(relevantMeeting.meetLengthInSeconds, 'seconds');
                // in case the relevant meeting is overlap
                if (isDatesOverlap(relevantMeeting.actualDate, relevantMeetingActualEndDate, meeting.actualDate, meetingActualEndTime)) {
                    _.each(relevantMeeting.invited, (relevantMeetingInvited) => {
                        if (_.indexOf(meeting.invited, relevantMeetingInvited) !== -1) {
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
    });
    console.log(`score:${fitnessScore}`);
    return fitnessScore;
}

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