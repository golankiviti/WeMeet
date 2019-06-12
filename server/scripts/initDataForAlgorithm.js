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

let preference = {
    name: 'address',
    address: 'abc'
};

// some users
let usersTmp = [{
        local: {
            email: 'a@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'גיל',
        lastName: 'אורמן'
    },
    {
        local: {
            email: 'b@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'female',
        firstName: 'זיוה',
        lastName: 'כהן'
    },
    {
        local: {
            email: 'c@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'male',
        firstName: 'דין',
        lastName: 'זליגמן'
    },
    {
        local: {
            email: 'd@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'male',
        firstName: 'גולן',
        lastName: 'קיויתי'
    },
    {
        local: {
            email: 'e@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'male',
        firstName: 'עידן',
        lastName: 'לזרוביץ'
    },
    {
        local: {
            email: 'f@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'male',
        firstName: 'רון',
        lastName: 'אברהם'
    },
    {
        local: {
            email: 'g@a.com',
            password: '123'
        },
        address: 'some address',
        gender: 'male',
        firstName: 'יוחנן',
        lastName: 'האגדי'
    }
];

let restrictionsTmp = [{
        name: 'לישון',
        startDate: moment().startOf('day').add(1, 'd').hour(10).minute(30),
        endDate: moment().startOf('day').add(1, 'd').hour(12).minute(0)
    },
    {
        name: 'לראות לוציפר',
        startDate: moment().startOf('day').add(1, 'd').hour(8).minute(0),
        endDate: moment().startOf('day').add(1, 'd').hour(10).minute(0)
    },
    {
        name: 'זמן מדיציה',
        startDate: moment().startOf('day').add(1, 'd').hour(13).minute(0),
        endDate: moment().startOf('day').add(2, 'd').hour(9).minute(0)
    },
    {
        name: 'לחשוב מחשבות חיוביות',
        startDate: moment().startOf('day').add(4, 'd').hour(8).minute(30),
        endDate: moment().startOf('day').add(4, 'd').hour(22).minute(0)
    },
    {
        name: 'להתקשר לסבתא',
        startDate: moment().startOf('day').add(4, 'd').hour(8).minute(0),
        endDate: moment().startOf('day').add(5, 'd').hour(8).minute(30)
    },
    {
        name: 'סוגר בבסיס',
        startDate: moment().startOf('day').add(3, 'd').hour(17).minute(0),
        endDate: moment().startOf('day').add(4, 'd').hour(8).minute(00)
    },
    {
        name: 'שנצ',
        startDate: moment().startOf('day').add(2, 'd').hour(12).minute(0),
        endDate: moment().startOf('day').add(2, 'd').hour(13).minute(30)
    },
    {
        name: 'ארוחת בוקר עם אבא',
        startDate: moment().startOf('day').add(3, 'd').hour(8).minute(0),
        endDate: moment().startOf('day').add(3, 'd').hour(10).minute(0)
    },
    {
        name: 'סיבוב ברים עם החברה הטובים',
        startDate: moment().startOf('day').add(4, 'd').hour(18).minute(0),
        endDate: moment().startOf('day').add(5, 'd').hour(9).minute(0)
    },
    {
        name: 'ביביסטר על הבני דודים',
        startDate: moment().startOf('day').add(5, 'd').hour(16).minute(0),
        endDate: moment().startOf('day').add(5, 'd').hour(22).minute(0)
    },
    {
        name: 'החלפת צמיגים לאוטו',
        startDate: moment().startOf('day').add(4, 'd').hour(8).minute(0),
        endDate: moment().startOf('day').add(4, 'd').hour(10).minute(0)
    },
    {
        name: 'מדיטציה',
        startDate: moment().startOf('day').add(4, 'd').hour(16).minute(0),
        endDate: moment().startOf('day').add(4, 'd').hour(20).minute(0)
    },
    {
        name: 'אימון כושר',
        startDate: moment().startOf('day').add(2, 'd').hour(8).minute(0),
        endDate: moment().startOf('day').add(3, 'd').hour(10).minute(0)
    },
    {
        name: 'סגירה בבסיס',
        startDate: moment().startOf('day').add(4, 'd').hour(8).minute(0),
        endDate: moment().startOf('day').add(6, 'd').hour(8).minute(0)
    },
    {
        name: 'ביקור אצל סבתא',
        startDate: moment().startOf('day').add(3, 'd').hour(18).minute(0),
        endDate: moment().startOf('day').add(3, 'd').hour(20).minute(0)
    },
    {
        name: 'יום כיף עם אמא',
        startDate: moment().startOf('day').add(3, 'd').hour(14).minute(0),
        endDate: moment().startOf('day').add(4, 'd').hour(14).minute(0)
    },
    {
        name: 'לישון עם האויב',
        startDate: moment().startOf('day').add(2, 'd').hour(13).minute(0),
        endDate: moment().startOf('day').add(3, 'd').hour(10).minute(0)
    },
    {
        name: 'בינג ריק ומורטי',
        startDate: moment().startOf('day').add(3, 'd').hour(14).minute(0),
        endDate: moment().startOf('day').add(4, 'd').hour(10).minute(0)
    },
    {
        name: 'PI',
        startDate: moment().startOf('day').add(4, 'd').hour(8).minute(0),
        endDate: moment().startOf('day').add(4, 'd').hour(22).minute(0)
    },
    {
        name: 'ארוחת צהריים עם אהובתי',
        startDate: moment().startOf('day').add(2, 'd').hour(11).minute(30),
        endDate: moment().startOf('day').add(2, 'd').hour(13).minute(0)
    },
    {
        name: 'הופעה של אברהם טל',
        startDate: moment().startOf('day').add(2, 'd').hour(18).minute(0),
        endDate: moment().startOf('day').add(3, 'd').hour(10).minute(0)
    },
    {
        name: 'לשמוע מוסיקה',
        startDate: moment().startOf('day').add(3, 'd').hour(8).minute(0),
        endDate: moment().startOf('day').add(3, 'd').hour(9).minute(0)
    },
    {
        name: 'מיטאפ באילת (על חשבון החברה)',
        startDate: moment().startOf('day').add(3, 'd').hour(13).minute(0),
        endDate: moment().startOf('day').add(5, 'd').hour(22).minute(0)
    },
    {
        name: 'יום יוגה',
        startDate: moment().startOf('day').add(1, 'd').hour(8).minute(0),
        endDate: moment().startOf('day').add(1, 'd').hour(23).minute(0)
    },
    {
        name: 'זמן לעצמי',
        startDate: moment().startOf('day').add(3, 'd').hour(16).minute(30),
        endDate: moment().startOf('day').add(4, 'd').hour(8).minute(0)
    },
];

let meetingsTmp = [{
    name: 'פגישה עם החברה הטובים',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 1,
    fromDate: moment().startOf('day').add(7, 'd').hour(9),
    toDate: moment().startOf('day').add(8, 'd').hour(13),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'לחשוב על אלגוריתם לשיבוץ פגישות',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 1,
    fromDate: moment().startOf('day').add(2, 'd').hour(12).minute(30),
    toDate: moment().startOf('day').add(4, 'd').hour(10).minute(30),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'לשבת על בירה',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 1,
    fromDate: moment().startOf('day').add(3, 'd').hour(10),
    toDate: moment().startOf('day').add(4, 'd').hour(12),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'לראות הנוקמים בקולנוע',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 4,
    fromDate: moment().startOf('day').add(4, 'd').hour(9),
    toDate: moment().startOf('day').add(5, 'd').hour(17).minute(30),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'דייט מושלם',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 0.5,
    fromDate: moment().startOf('day').add(1, 'd').hour(20),
    toDate: moment().startOf('day').add(5, 'd').hour(22),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'מפגש שבועי בבית קפה השכונתי',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 2.5,
    fromDate: moment().startOf('day').add(3, 'd').hour(9),
    toDate: moment().startOf('day').add(5, 'd').hour(19),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'חושבים על רעיון לסטרטאפ',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 5,
    fromDate: moment().startOf('day').add(2, 'd').hour(10),
    toDate: moment().startOf('day').add(5, 'd').hour(16),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'עובדים על פרוירקט באנדרואיד',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 2,
    fromDate: moment().startOf('day').add(3, 'd').hour(14).minute(30),
    toDate: moment().startOf('day').add(5, 'd').hour(15),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'לומדים לסיבוכיות',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 2.5,
    fromDate: moment().startOf('day').add(1, 'd').hour(8).minute(30),
    toDate: moment().startOf('day').add(5, 'd').hour(20).minute(30),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'יום כיף עם החברים',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 6,
    fromDate: moment().startOf('day').add(1, 'd').hour(9).minute(30),
    toDate: moment().startOf('day').add(3, 'd').hour(8).minute(30),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'פגישה עם איגור',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 3,
    fromDate: moment().startOf('day').add(2, 'd').hour(7).minute(30),
    toDate: moment().startOf('day').add(4, 'd').hour(16).minute(30),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'לראות אמריקן פאי',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 2,
    fromDate: moment().startOf('day').add(1, 'd').hour(19).minute(30),
    toDate: moment().startOf('day').add(3, 'd').hour(9).minute(0),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}, {
    name: 'מפגש שתיקה',
    isDetermined: false,
    meetLengthInSeconds: 60 * 60 * 1,
    fromDate: moment().startOf('day').add(3, 'd').hour(21).minute(30),
    toDate: moment().startOf('day').add(6, 'd').hour(15).minute(0),
    invited: [],
    locations: [usersTmp[0].address],
    selectedLocation: usersTmp[0].address,
    accepted: [],
    rejected: [],
    location: 'address'
}];

// connect to mongo for the saving
return connectToMongo(MONGO_URL, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD)
    .then(() => {
        console.log('Initializing sequence:')
        console.log('clearing db...')
        return Promise.all([
            users.remove({}),
            preferences.remove({}),
            restrictions.remove({}),
            meetings.remove({})
        ])
    })
    .then(() => {
        let savedUsers = [];
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
            .then(() => {
                return _.sortBy(savedUsers, '_id');
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
        meetingsTmp[0].creator = users[1]._id.toString();

        meetingsTmp[1].invited = [
            users[2]._id.toString(),
            users[3]._id.toString(),
            users[4]._id.toString(),
        ];
        meetingsTmp[1].creator = users[3]._id.toString();

        meetingsTmp[2].invited = [
            users[4]._id.toString(),
            users[5]._id.toString(),
            users[6]._id.toString(),
        ];
        meetingsTmp[2].creator = users[5]._id.toString();

        meetingsTmp[3].invited = [
            users[1]._id.toString(),
            users[2]._id.toString(),
            users[3]._id.toString(),
            users[4]._id.toString(),
        ];
        meetingsTmp[3].creator = users[1]._id.toString();

        meetingsTmp[4].invited = [
            users[0]._id.toString(),
            users[1]._id.toString(),
        ];
        meetingsTmp[4].creator = users[1]._id.toString();

        meetingsTmp[5].invited = [
            users[1]._id.toString(),
            users[2]._id.toString(),
            users[3]._id.toString(),
        ];
        meetingsTmp[5].creator = users[3]._id.toString();

        meetingsTmp[6].invited = [
            users[0]._id.toString(),
            users[2]._id.toString(),
            users[3]._id.toString(),
            users[4]._id.toString(),
            users[5]._id.toString(),
        ];
        meetingsTmp[6].creator = users[5]._id.toString();

        meetingsTmp[7].invited = [
            users[0]._id.toString(),
            users[5]._id.toString(),
            users[6]._id.toString(),
        ];
        meetingsTmp[7].creator = users[0]._id.toString();

        meetingsTmp[8].invited = [
            users[2]._id.toString(),
            users[3]._id.toString(),
            users[4]._id.toString(),
            users[5]._id.toString(),
        ];
        meetingsTmp[8].creator = users[3]._id.toString();

        meetingsTmp[9].invited = [
            users[0]._id.toString(),
            users[1]._id.toString(),
            users[6]._id.toString(),
        ];
        meetingsTmp[9].creator = users[0]._id.toString();

        meetingsTmp[10].invited = [
            users[4]._id.toString(),
            users[5]._id.toString(),
            users[6]._id.toString(),
        ];
        meetingsTmp[10].creator = users[6]._id.toString();

        meetingsTmp[11].invited = [
            users[2]._id.toString(),
            users[5]._id.toString(),
            users[6]._id.toString(),
        ];
        meetingsTmp[11].creator = users[6]._id.toString();

        meetingsTmp[12].invited = [
            users[0]._id.toString(),
            users[4]._id.toString(),
        ];
        meetingsTmp[12].creator = users[4]._id.toString();

        return Promise.map(meetingsTmp, (meet) => {
                let tmp = new meetings(meet);
                return tmp.save();
            })
            .then(() => {
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
                return Promise.map(restrictionsTmp, restrict => {
                    let tmp = new restrictions(restrict);
                    return tmp.save();
                })
            })
            .then(() => {
                return Promise.map(users, (user) => {
                    let pref = Object.assign({
                        user: user._id.toString()
                    }, preference);
                    let tmp = new preferences(pref);
                    return tmp.save();
                });
            });
    })
    .then(() => {
        console.log('finish init db');
        process.exit(0);
    })
    .catch((err) => {
        console.log(err);
    });