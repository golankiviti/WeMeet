console.log('algorithmExecuter is up!, wait for data');
process.on('message', (meetings) => {
    console.log('got data');
    setTimeout(() => {
        console.log('send results');
        process.send(meetings);
        process.exit(0);
    }, 10000);
});