const Genetic = require('genetic-js'),
    _ = require('lodash'),
    Moment = require('moment'),
    momentRange = require('moment-range');
const moment = momentRange.extendMoment(Moment);

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
    let finalResults = _.map(data.meetings, (currentMeeting) => {
        let meetingFromDate = moment(currentMeeting.fromDate),
            meetingToDate = moment(currentMeeting.toDate);
        // create instace of the algorithm
        let genetic = Genetic.create();
        // config our algorithm
        genetic.optimize = Genetic.Optimize.Maximize;
        genetic.select1 = Genetic.Select1.Tournament2;
        genetic.select2 = Genetic.Select2.Tournament2;
        genetic.seed = () => {
            function randomDateBetweenTwoDates(start, end) {
                return moment(start.valueOf() + Math.random() * (end.valueOf() - start.valueOf()));
            }
            let startTime, endTime;
            // random the startTime
            startTime = randomDateBetweenTwoDates(meetingFromDate, meetingToDate);
            // add to startTime the meeting length
            endTime = moment(startTime).add(currentMeeting.meetLengthInSeconds, 'seconds');
            return {
                startTime,
                endTime
            };
        };
        genetic.fitness = (individual) => {
            // check first if the individual is in the range of the given wanted meeting dates
            if (individual.startTime.isAfter(meetingFromDate) &&
                individual.endTime.isBefore(meetingToDate)) {
                // get all restrictions that relevant for the individual
                let relevantRestrictions = _.filter(data.restrictions, (restrict) => {
                    return _.indexOf(currentMeeting.invited, restrict.userId) !== -1;
                });
                relevantRestrictions = _.map(relevantRestrictions, ['userRestriction']);
                relevantRestrictions = _.flatten(relevantRestrictions);
                let restictionLength = relevantRestrictions.length;
                let fitness = 0.0;
                // run over all restrictions
                _.forEach(relevantRestrictions, (restrict) => {
                    // get range date of restriction and individual
                    let restrictRange = moment.range(moment(restrict.startDate, restrict.endDate)),
                        individualRange = moment.range(individual.startTime, individual.endTime);
                    // if the two range do not overlaps it is good
                    if (!restrictRange.overlaps(individualRange)) {
                        fitness += 1 / restictionLength;
                    }
                });
                return fitness;
            } else {
                return 0.0;
            }
        };
        genetic.mutate = (individual) => {
            // generate number between 1 to 3
            let randomHours = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            if (Math.random() > 0.5) {
                individual.startTime.add(randomHours, 'h');
                individual.endTime.add(randomHours, 'h');
            } else {
                individual.startTime.substract(randomHours, 'h');
                individual.endTime.substract(randomHours, 'h');
            }
            return individual;
        };
        genetic.crossover = (mother, father) => {
            return [mother, father];
        };
        let geneticConfig = {
            size: 1000,
            crossover: 0.5,
            mutation: 0.2,
            iterations: 100,
            fittestAlwaysSurvives: true
        };

        let result = genetic.evolve(geneticConfig);
        console.log(result)
    });
});