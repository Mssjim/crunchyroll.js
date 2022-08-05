const fetch = require('./src/fetcher.js');
const urls = require('./src/urls.json');

let client = {};

String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

async function checkLogin() {
    if(!client.login) throw new Error('You must login first');
    if(Date.now() - client.time > 1000*60*4);
    await login(client.login.email, client.login.password);
}

async function getToken(email, password) {
    const headers = {
        'Authorization': "Basic aHJobzlxM2F3dnNrMjJ1LXRzNWE6cHROOURteXRBU2Z6QjZvbXVsSzh6cUxzYTczVE1TY1k=",
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    };

    const data = new URLSearchParams({
        'username': email,
        'password': password,
        'grant_type': 'password',
        'scope': 'offline_access'
    });

    const {body} = await fetch('POST', urls.token, headers, data.toString());

    client.id = body.account_id;
    client.access_token = `${body.token_type} ${body.access_token}`;
    client.refresh_token = body.refresh_token;

    if(!client.id) throw new Error('Invalid credentials');
}

async function authenticate() {
    const headers = {
        'Authorization': client.access_token,
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    };
    const {body} = await fetch('GET', urls.index, headers);
    if(body.error) throw new Error(body.error);

    client.bucket = body.cms.bucket;
    client.cms = body.cms;
    client.getQuery = () => `Signature=${client.cms.signature}&Policy=${client.cms.policy}&Expires=${client.cms.expires}&Key-Pair-Id=${client.cms.key_pair_id}&locale=${client.locale}`;
}

async function login(email, password, locale = 'en-US') {
    client.login = { email, password };
    client.time = Date.now();
    client.locale = locale;
    await getToken(email, password);
    await authenticate();

    console.log('✔ Autenticado!');
}

module.exports = {
    client,
    login
}