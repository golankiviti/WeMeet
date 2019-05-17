const Promise = require('bluebird'),
    moment = require('moment'),
    _ = require('lodash');
const {
    meetings,
    preferences,
    restrictions,
    users
} = require('../data').schemas;

connectToMongo = require('../data');

const MONGO_URL = process.env.MONGO_URL || 'localhost',
    MONGO_PORT = process.env.MONGO_PORT || '27017',
    MONGO_USERNAME = process.env.MONGO_USERNAME || null,
    MONGO_PASSWORD = process.env.MONGO_PASSWORD || null;

// some users
let usersTmp = [{
        local: {
            email: 'a@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'user',
        lastName: '1'
    },
    {
        local: {
            email: 'b@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'user',
        lastName: '2'
    },
    {
        local: {
            email: 'c@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'user',
        lastName: '3'
    },
    {
        local: {
            email: 'd@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'user',
        lastName: '4'
    },
    {
        local: {
            email: 'e@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'user',
        lastName: '5'
    },
    {
        local: {
            email: 'f@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'user',
        lastName: '6'
    },
    {
        local: {
            email: 'g@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'user',
        lastName: '7'
    }
];

let restrictionsTmp = [{
        name: 'user 1 restriction 1',
        startDate: moment().startOf('week').add(0,'d').hour(10).minute(30),
        endDate: moment().startOf('week').add(0,'d').hour(12).minute(0)
    },
    {
        name: 'user 1 restriction 2',
        startDate: moment().startOf('week').add(0,'d').hour(8).minute(0),
        endDate: moment().startOf('week').add(0,'d').hour(10).minute(0)
    },
    {
        name: 'user 1 restriction 3',
        startDate: moment().startOf('week').add(0,'d').hour(13).minute(0),
        endDate: moment().startOf('week').add(1,'d').hour(9).minute(0)
    },
    {
        name: 'user 1 restriction 4',
        startDate: moment().startOf('week').add(3,'d').hour(8).minute(30),
        endDate: moment().startOf('week').add(3,'d').hour(22).minute(0)
    },
    {
        name: 'user 1 restriction 5',
        startDate: moment().startOf('week').add(3,'d').hour(8).minute(0),
        endDate: moment().startOf('week').add(4,'d').hour(8).minute(30)
    },
    {
        name: 'user 1 restriction 6',
        startDate: moment().startOf('week').add(2,'d').hour(17).minute(0),
        endDate: moment().startOf('week').add(3,'d').hour(8).minute(00)
    },
    {
        name: 'user 3 restriction 1',
        startDate: moment().startOf('week').add(1,'d').hour(12).minute(0),
        endDate: moment().startOf('week').add(1,'d').hour(13).minute(30)
    },
    {
        name: 'user 3 restriction 2',
        startDate: moment().startOf('week').add(2,'d').hour(8).minute(0),
        endDate: moment().startOf('week').add(2,'d').hour(10).minute(0)
    },
    {
        name: 'user 3 restriction 3',
        startDate: moment().startOf('week').add(3,'d').hour(18).minute(0),
        endDate: moment().startOf('week').add(4,'d').hour(9).minute(0)
    },
    {
        name: 'user 3 restriction 4',
        startDate: moment().startOf('week').add(4,'d').hour(16).minute(0),
        endDate: moment().startOf('week').add(4,'d').hour(22).minute(0)
    },
    {
        name: 'user 3 restriction 5',
        startDate: moment().startOf('week').add(3,'d').hour(8).minute(0),
        endDate: moment().startOf('week').add(3,'d').hour(10).minute(0)
    },
    {
        name: 'user 3 restriction 6',
        startDate: moment().startOf('week').add(3,'d').hour(16).minute(0),
        endDate: moment().startOf('week').add(3,'d').hour(20).minute(0)
    },
    {
        name: 'user 4 restriction 1',
        startDate: moment().startOf('week').add(1,'d').hour(8).minute(0),
        endDate: moment().startOf('week').add(2,'d').hour(10).minute(0)
    },
    {
        name: 'user 4 restriction 2',
        startDate: moment().startOf('week').add(3,'d').hour(8).minute(0),
        endDate: moment().startOf('week').add(5,'d').hour(8).minute(0)
    },
    {
        name: 'user 4 restriction 3',
        startDate: moment().startOf('week').add(2,'d').hour(18).minute(0),
        endDate: moment().startOf('week').add(2,'d').hour(20).minute(0)
    },
    {
        name: 'user 5 restriction 1',
        startDate: moment().startOf('week').add(2,'d').hour(14).minute(0),
        endDate: moment().startOf('week').add(3,'d').hour(14).minute(0)
    },
    {
        name: 'user 5 restriction 2',
        startDate: moment().startOf('week').add(1,'d').hour(13).minute(0),
        endDate: moment().startOf('week').add(2,'d').hour(10).minute(0)
    },
    {
        name: 'user 5 restriction 3',
        startDate: moment().startOf('week').add(2,'d').hour(14).minute(0),
        endDate: moment().startOf('week').add(3,'d').hour(10).minute(0)
    },
    {
        name: 'user 6 restriction 1',
        startDate: moment().startOf('week').add(3,'d').hour(8).minute(0),
        endDate: moment().startOf('week').add(3,'d').hour(22).minute(0)
    },
    {
        name: 'user 6 restriction 2',
        startDate: moment().startOf('week').add(1,'d').hour(11).minute(30),
        endDate: moment().startOf('week').add(1,'d').hour(13).minute(0)
    },
    {
        name: 'user 6 restriction 3',
        startDate: moment().startOf('week').add(1,'d').hour(18).minute(0),
        endDate: moment().startOf('week').add(2,'d').hour(10).minute(0)
    },
    {
        name: 'user 7 restriction 1',
        startDate: moment().startOf('week').add(2,'d').hour(8).minute(0),
        endDate: moment().startOf('week').add(2,'d').hour(9).minute(0)
    },
    {
        name: 'user 7 restriction 2',
        startDate: moment().startOf('week').add(2,'d').hour(13).minute(0),
        endDate: moment().startOf('week').add(4,'d').hour(22).minute(0)
    },
    {
        name: 'user 7 restriction 3',
        startDate: moment().startOf('week').add(0,'d').hour(8).minute(0),
        endDate: moment().startOf('week').add(0,'d').hour(23).minute(0)
    },
    {
        name: 'user 7 restriction 4',
        startDate: moment().startOf('week').add(2,'d').hour(16).minute(30),
        endDate: moment().startOf('week').add(3,'d').hour(8).minute(0)
    },
];

let meetingsTmp = [{
    name: 'meet 1',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 1,
    fromDate: moment().startOf('week').hour(9),
    toDate: moment().startOf('week').hour(13),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
}, {
    name: 'meet 2',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 1,
    fromDate: moment().startOf('week').add(1,'d').hour(12).minute(30),
    toDate: moment().startOf('week').add(3,'d').hour(10).minute(30),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 3',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 1,
    fromDate: moment().startOf('week').add(2,'d').hour(10),
    toDate: moment().startOf('week').add(3,'d').hour(12),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 4',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 4,
    fromDate: moment().startOf('week').add(3,'d').hour(9),
    toDate: moment().startOf('week').add(4,'d').hour(17).minute(30),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 5',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 0.5,
    fromDate: moment().startOf('week').add(0,'d').hour(20),
    toDate: moment().startOf('week').add(4,'d').hour(22),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 6',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 2.5,
    fromDate: moment().startOf('week').add(2,'d').hour(9),
    toDate: moment().startOf('week').add(4,'d').hour(19),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 7',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 5,
    fromDate: moment().startOf('week').add(1,'d').hour(10),
    toDate: moment().startOf('week').add(4,'d').hour(16),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 8',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 2,
    fromDate: moment().startOf('week').add(2,'d').hour(14).minute(30),
    toDate: moment().startOf('week').add(4,'d').hour(15),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 9',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 2.5,
    fromDate: moment().startOf('week').add(0,'d').hour(8).minute(30),
    toDate: moment().startOf('week').add(4,'d').hour(20).minute(30),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 10',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 6,
    fromDate: moment().startOf('week').add(0,'d').hour(9).minute(30),
    toDate: moment().startOf('week').add(2,'d').hour(8).minute(30),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 11',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 3,
    fromDate: moment().startOf('week').add(1,'d').hour(7).minute(30),
    toDate: moment().startOf('week').add(3,'d').hour(16).minute(30),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 12',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 2,
    fromDate: moment().startOf('week').add(0,'d').hour(19).minute(30),
    toDate: moment().startOf('week').add(2,'d').hour(9).minute(0),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
},{
    name: 'meet 13',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 1,
    fromDate: moment().startOf('week').add(2,'d').hour(21).minute(30),
    toDate: moment().startOf('week').add(5,'d').hour(15).minute(0),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
}];

// connect to mongo for the saving
return connectToMongo(MONGO_URL, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD)
    .then(() => {
        let savedUsers=[];
        // init some users
        console.log('init some users');
        return Promise.map(usersTmp, (usr, index) => {
            let tmp = new users(usr);
            tmp.local.password = tmp.generateHash(tmp.local.password);
            return tmp.save()
                .then((savedUsr) => {
                    savedUsers.push(savedUsr.toObject());
                });
        })
        .then(()=>{
            return _.sortBy(savedUsers,'lastName');
        })
    })
    .then((users) => {
        // init some preferences
        console.log('init meetings');
        meetingsTmp[0].invited = [
            users[0]._id.toString(),
            users[1]._id.toString(),
            users[2]._id.toString(),
        ];
        meetingsTmp[1].invited = [
            users[2]._id.toString(),
            users[3]._id.toString(),
            users[4]._id.toString(),
        ];
        meetingsTmp[2].invited = [
            users[4]._id.toString(),
            users[5]._id.toString(),
            users[6]._id.toString(),
        ];
        meetingsTmp[3].invited = [
            users[1]._id.toString(),
            users[2]._id.toString(),
            users[3]._id.toString(),
            users[4]._id.toString(),
        ];
        meetingsTmp[4].invited = [
            users[0]._id.toString(),
            users[1]._id.toString(),
        ];
        meetingsTmp[5].invited = [
            users[1]._id.toString(),
            users[2]._id.toString(),
            users[3]._id.toString(),
        ];
        meetingsTmp[6].invited = [
            users[0]._id.toString(),
            users[2]._id.toString(),
            users[3]._id.toString(),
            users[4]._id.toString(),
            users[5]._id.toString(),
        ];
        meetingsTmp[7].invited = [
            users[0]._id.toString(),
            users[5]._id.toString(),
            users[6]._id.toString(),
        ];
        meetingsTmp[8].invited = [
            users[2]._id.toString(),
            users[3]._id.toString(),
            users[4]._id.toString(),
            users[5]._id.toString(),
        ];
        meetingsTmp[9].invited = [
            users[0]._id.toString(),
            users[1]._id.toString(),
            users[6]._id.toString(),
        ];
        meetingsTmp[10].invited = [
            users[4]._id.toString(),
            users[5]._id.toString(),
            users[6]._id.toString(),
        ];
        meetingsTmp[11].invited = [
            users[2]._id.toString(),
            users[5]._id.toString(),
            users[6]._id.toString(),
        ];
        meetingsTmp[12].invited = [
            users[0]._id.toString(),
            users[4]._id.toString(),
        ];
        return Promise.map(meetingsTmp, (meet) => {
            let tmp = new meetings(meet);
            return tmp.save();
        })
        .then(()=>{
            console.log('init restrictions');
            restrictionsTmp[0].user = users[0]._id.toString();
            restrictionsTmp[1].user = users[0]._id.toString();
            restrictionsTmp[2].user = users[0]._id.toString();
            restrictionsTmp[3].user = users[0]._id.toString();
            restrictionsTmp[4].user = users[0]._id.toString();
            restrictionsTmp[5].user = users[0]._id.toString();
            restrictionsTmp[6].user = users[2]._id.toString();
            restrictionsTmp[7].user = users[2]._id.toString();
            restrictionsTmp[8].user = users[2]._id.toString();
            restrictionsTmp[9].user = users[2]._id.toString();
            restrictionsTmp[10].user = users[2]._id.toString();
            restrictionsTmp[11].user = users[2]._id.toString();
            restrictionsTmp[12].user = users[3]._id.toString();
            restrictionsTmp[13].user = users[3]._id.toString();
            restrictionsTmp[14].user = users[3]._id.toString();
            restrictionsTmp[15].user = users[4]._id.toString();
            restrictionsTmp[16].user = users[4]._id.toString();
            restrictionsTmp[17].user = users[4]._id.toString();
            restrictionsTmp[18].user = users[5]._id.toString();
            restrictionsTmp[19].user = users[5]._id.toString();
            restrictionsTmp[20].user = users[5]._id.toString();
            restrictionsTmp[21].user = users[6]._id.toString();
            restrictionsTmp[22].user = users[6]._id.toString();
            restrictionsTmp[23].user = users[6]._id.toString();
            restrictionsTmp[24].user = users[6]._id.toString();
            return Promise.map(restrictionsTmp,restrict=>{
                let tmp = new restrictions(restrict);
                return tmp.save();
            })
        });
    })
    .then(() => {
        console.log('finish init db');
        process.exit(0);
    })
    .catch((err) => {
        console.log(err);
    });