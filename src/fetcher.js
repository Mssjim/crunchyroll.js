module.exports = async(method, url, headers, body) => {
    return await new Promise((resolve, reject) => {
        require('request')({
            method: method,
            uri: url,
            headers: headers,
            body: body,
            json: true
        }, (err, res) => {
            if(err) return reject(err);
            return resolve(res);
        });
    });
}