const Promise = require('bluebird'),
    moment = require('moment');
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
        firstName: 'a',
        lastName: 'a'
    },
    {
        local: {
            email: 'b@b.com',
            password: '123'
        },
        address: 'some address',
        gender: 'male',
        firstName: 'b',
        lastName: 'b'
    },
    {
        local: {
            email: 'c@c.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'c',
        lastName: 'c'
    },
    {
        local: {
            email: 'd@d.com',
            password: '123'
        },
        address: 'some address',
        gender: 'male',
        firstName: 'd',
        lastName: 'd'
    },
    {
        local: {
            email: 'e@e.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'e',
        lastName: 'e'
    }
];

let preferenceTmp = [{
        name: 'a place',
        address: 'a place address'
    },
    {
        name: 'b place',
        address: 'b place address'
    },
    {
        name: 'c place',
        address: 'c place address'
    },
    {
        name: 'd place',
        address: 'd place address'
    },
    {
        name: 'e place',
        address: 'e place address'
    }
];

let restrictionsTmp = [{
        name: 'a restriction',
        startDate: moment().add(2, 'd').toDate(),
        endDate: moment().add(2, 'd').add(3, 'h').toDate()
    },
    {
        name: 'b restriction',
        startDate: moment().add(1, 'd').toDate(),
        endDate: moment().add(1, 'd').add(2, 'h').toDate()
    },
    {
        name: 'c restriction',
        startDate: moment().add(3, 'd').toDate(),
        endDate: moment().add(3, 'd').add(4, 'h').toDate()
    },
    {
        name: 'd restriction',
        startDate: moment().add(1, 'd').toDate(),
        endDate: moment().add(1, 'd').add(3, 'h').toDate()
    },
    {
        name: 'e restriction',
        startDate: moment().add(2, 'd').toDate(),
        endDate: moment().add(2, 'd').add(5, 'h').toDate()
    }
];

let meetingsTmp = [{
    name: 'meet A',
    isDetermined: true,
    meetLengthInSeconds: 60 * 60 * 3,
    actualDate: moment().add(6, 'd').toDate(),
    fromDate: moment().add(5, 'd').toDate(),
    toDate: moment().add(5, 'd').add(5, 'h').toDate(),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: []
}, {
    name: 'meet B',
    isDetermined: true,
    meetLengthInSeconds: 60 * 60 * 3,
    actualDate: moment().add(7, 'd').toDate(),
    fromDate: moment().add(6, 'd').toDate(),
    toDate: moment().add(6, 'd').add(5, 'h').toDate(),
    invited: [],
    locations: [usersTmp[1].address],
    selectedLocation: usersTmp[1].address,
    accepted: [],
    rejected: []
}, {
    name: 'meet C (for algorithm)',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 3,
    fromDate: moment().add(1, 'd').toDate(),
    toDate: moment().add(15, 'd').toDate(),
    invited: [],
    locations: [usersTmp[1].address],
    selectedLocation: usersTmp[1].address,
    accepted: [],
    rejected: []
}, {
    name: 'meet D (for algorithm)',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 3,
    fromDate: moment().add(16, 'd').toDate(),
    toDate: moment().add(23, 'd').toDate(),
    invited: [],
    locations: [usersTmp[1].address],
    selectedLocation: usersTmp[1].address,
    accepted: [],
    rejected: []
}];

// connect to mongo for the saving
return connectToMongo(MONGO_URL, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD)
    .then(() => {
        // init some users
        console.log('init some users');
        return Promise.map(usersTmp, (usr, index) => {
            let tmp = new users(usr);
            tmp.local.password = tmp.generateHash(tmp.local.password);
            return tmp.save()
                .then((savedUsr) => {
                    if (index === 0) {
                        meetingsTmp[index].creator = savedUsr._id;
                    }
                    if (index === 1) {
                        meetingsTmp[index].creator = savedUsr._id;
                    }
                    if (index === 2) {
                        meetingsTmp[index].creator = savedUsr._id;
                    }
                    if (index === 3) {
                        meetingsTmp[index].creator = savedUsr._id;
                    }
                    usersTmp[index]._id = savedUsr._id;
                    preferenceTmp[index].user = savedUsr._id;
                    restrictionsTmp[index].user = savedUsr._id;
                    meetingsTmp[0].participants.push(savedUsr._id);
                    meetingsTmp[1].participants.push(savedUsr._id);
                    meetingsTmp[2].participants.push(savedUsr._id);
                    meetingsTmp[3].participants.push(savedUsr._id);
                });
        });
    })
    .then(() => {
        // init some preferences
        console.log('init preference');
        return Promise.map(preferenceTmp, (pref) => {
            let tmp = new preferences(pref);
            return tmp.save();
        });
    })
    .then(() => {
        // init some restrictions
        console.log('init restrictions');
        return Promise.map(restrictionsTmp, (res) => {
            let tmp = new restrictions(res);
            return tmp.save();
        });
    })
    .then(() => {
        // init some meetings
        console.log('init meetings');
        return Promise.map(meetingsTmp, (meet) => {
            let tmp = new meetings(meet);
            return tmp.save();
        });
    })
    .then(() => {
        console.log('finish init db');
        process.exit(0);
    })
    .catch((err) => {
        console.log(err);
    });