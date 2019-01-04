import moment from 'moment';

export function fetchWaitingMeetings(userId) {
    // should be:
    // return fetch(`API_URL/${userId}?status=waiting`) // or something like that
    // .then((res)=>res.json())
    // .then((res)=>res);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    _id: '1',
                    startTime: moment().subtract(1, 'hours').format(),
                    endTime: moment().subtract(0.5, 'hours').format(),
                    title: 'meet 1',
                    status: 'wait'
                },
                {
                    _id: '2',
                    startTime: moment().subtract(2, 'hours').format(),
                    endTime: moment().subtract(1, 'hours').format(),
                    title: 'meet 2',
                    status: 'wait'
                },
                {
                    _id: '3',
                    startTime: moment().subtract(3, 'hours').format(),
                    endTime: moment().subtract(1, 'hours').format(),
                    title: 'meet 3',
                    status: 'wait'
                },
                {
                    _id: '4',
                    startTime: moment().subtract(4, 'hours').format(),
                    endTime: moment().subtract(3, 'hours').format(),
                    title: 'meet 4',
                    status: 'wait'
                },
            ]);
        }, 1000)
    });
}