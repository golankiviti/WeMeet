const Genetic = require('genetic-js'),
    _ = require('lodash'),
    Moment = require('moment'),
    momentRange = require('moment-range');
const moment = momentRange.extendMoment(Moment);

const MIN_HOUR = process.env.ALGORITHM_MIN_HOUR || 8,
    MAX_HOUR = process.env.ALGORITHM_MAX_HOUR || 22

// when we got the meetings from the parent process
/**
    data:{
        // all meetings should be the meeting that need to asign
        meetings:[],
        // all restriction of all user that in the meetings above
        restrictions:[
            {
                userId:MongoId,
                userRestriction:[
                    restrictions
                ]
            }
        ]
    }
*/
process.on('message', (data) => {
    console.log('got data, start to execute the algorithm');
    // create instace of the algorithm
    let genetic = Genetic.create();
    // config our algorithm
    genetic.optimize = Genetic.Optimize.Minimize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;
    // create our seed function
    // every individual is snapshot of our calander:
    // [meeting, meeting, meeting...]
    genetic.seed = () => {
        let _ = require('lodash');
        let data = data;
        // run over all meetings and add to them the random actualDate
        let individual = _.map(data.meetings, (meeting) => {
            // init some variables
            // start actualDate from fromDate
            let meetingActualDate = moment(meeting.fromDate),
                // convert fromDate and toDate to moment dates
                meetingFromDate = moment(meeting.fromDate),
                meetingToDate = moment(meeting.toDate),
                // get the diff in days between fromDate and toDate
                diffrenceInDays = meetingToDate.diff(meetingFromDate, 'days'),
                // init minHour and maxHour to limitaion range
                minHour = MIN_HOUR,
                maxHour = MAX_HOUR,
                randomDay, randomHour;
            // generate random day between 0 to diff in days
            randomDay = randomBetweenTwoNumbers(0, diffrenceInDays);
            // in case randomDay is 0 and fromDate hour is greater the MIN_HOUR
            if (randomDay === 0 && meetingFromDate.hour() > MIN_HOUR) {
                minHour = meetingFromDate.hour();
            }
            // in case randomDay is the max day and toDate hour is lower the MAX_HOUR
            if (randomDay === diffrenceInDays && meetingToDate.hour() < MAX_HOUR) {
                maxHour = meetingToDate.hour();
            }
            // random hour between the min and max hour
            randomHour = randomBetweenTwoNumbers(minHour, maxHour);
            // set the random actual date
            meetingActualDate.add(randomDay, 'days').startOf('day').hour(randomHour);
            // put actual date in the meeting
            meeting.actualDate = meetingActualDate;
            // set the fromDate and toDate to moment for next algorithm manipulation
            meeting.fromDate = meetingFromDate;
            meeting.toDate = meetingToDate;
            // set meeting _id to string for sorting
            meeting._id = meeting._id.toString();
            return meeting;
        });
        // return sort meeting array
        return _.sortBy(individual, ['_id']);
    };
    // create fitness function
    genetic.fitness = (individual) => {
        let fitnessScore = 0;
        // run over all meeting in the individual
        _.each(individual, (meeting) => {
            let meetingActualEndTime = moment(meeting.actualDate).add(meeting.meetLengthInSeconds, 'seconds');
            // in case the actualDate is not in the range of fromDate and toDate
            if (!(meeting.actualDate.isAfter(meeting.fromDate) &&
                    meetingActualEndTime.isBefore(meeting.toDate))) {
                // add to score the number of invited 
                fitnessScore += meeting.invited.length;
            } else {
                // check here all the meetings and restrictions that are in the range of the current meeting
                // create dictionary of all invited.
                let invitedDict, relevantMeetings;
                _.each(meeting.invited, (user) => {
                    // right now every user can go to the meeting
                    invitedDict[user] = true;
                });
                // run over all restrictions
                _.each(data.restrictions, (restrictObject) => {
                    // in case this restriction is not relevant to any of our invited
                    if (_.indexOf(currentMeeting.invited, restrictObject.userId) === -1) return;
                    // run over all the restiction of the inveted and check if it intersact our meeting
                    _.each(restrictObject.userRestriction, (restrict) => {
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
                _.each(invitedDict, (key, value) => {
                    if (!value) numOfInvitedCanNotGoToMeeting++;
                });
                fitnessScore += numOfInvitedCanNotGoToMeeting / meeting.invited.length;
            }
        });

        return fitnessScore;
    };
    // create mutate function
    genetic.mutate = (individual) => {
        return individual;
    }
    // create crossover function
    genetic.crossover = (mother, father) => {
        return [mother, father];
    }
    // general config
    let geneticConfig = {
        size: 1000,
        crossover: 0.5,
        mutation: 0.2,
        iterations: 100,
        fittestAlwaysSurvives: true
    };
    let result = genetic.evolve(geneticConfig);
    console.log(result);
    process.send(result);
});

const randomBetweenTwoNumbers = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isDatesOverlap = (startDateOne, endDateOne, startDateTwo, endDateTwo) => {
    let rangeOne = moment.range(moment(startDateOne), moment(endDateOne)),
        rangeTwo = moment.range(moment(startDateTwo), moment(endDateTwo));
    return rangeOne.overlaps(rangeTwo);
};

const getRelevantMeetingForMeeting = (allMeetings, meeting) => {
    return _.filter(allMeetings, (currentMeeting) => {
        if (currentMeeting._id === meeting._id) return false;
        let isRelevant = false;
        _.each(meeting.invited, (invited) => {
            if (_.indexOf(currentMeeting.invited, invited) !== -1) {
                isRelevant = true;
                return false;
            }
        });
        return isRelevant;
    });
};