function weMeetFetch(url, options = {}, json = true) {
    const funcOptions = {
        headers: {
            'content-type': 'application/json'
        }
    };

    const newOptions = Object.assign({}, funcOptions, options);

    const promise = fetch(url, newOptions);

    if (json) {
        return promise.then(res => res.json())
    }

    return promise;
    
}

export default weMeetFetch;