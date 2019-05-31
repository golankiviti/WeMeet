export default function sleep(ms, callback) {
    return new Promise(resolve => setTimeout(resolve, ms))
        .then(callback);
}