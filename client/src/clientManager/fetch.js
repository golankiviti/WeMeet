let headers = {
    'content-type': 'application/json'
};

function weMeetFetch(url, options = {}, json = true) {
    headers.Authorization = localStorage.getItem('authToken');
    const funcOptions = {
        headers
    };

    const newOptions = Object.assign({}, funcOptions, options);

    const promise = fetch(url, newOptions);

    if (json) {
        return promise.then(res => res.json())
    }

    return promise;

}

function addTokenToHeaders(token) {
    localStorage.setItem('authToken', token);
    headers.Authorization = token;
}

export {
    addTokenToHeaders
};
export default weMeetFetch;