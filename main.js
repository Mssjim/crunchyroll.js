const fetch = require('./src/fetcher.js');
const urls = require('./src/urls.json');

let client = {
    time: 0,
    getQuery: () => {}
};

String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

async function checkLogin() {
    if(!client.login) throw new Error('You must login first');
    if(Date.now() - client.time > 1000*60*4)
        await login(client.login.email, client.login.password);
}

async function makeRequest(url) {
    await checkLogin();
    const {body} = await fetch('GET', url, {
        'Authorization': client.access_token,
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    });

    if(!body || body.__class__ == 'error') {
        console.log(body);
        throw new Error(body.message);
    }
    return body;
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
    client.locale = locale;
    await getToken(email, password);
    await authenticate();
    
    client.time = Date.now();
    console.log('✔ Autenticado!');
}

async function getProfile() {
    return await makeRequest(urls.profile);
}

async function getAnime(animeId) {
    return await makeRequest(urls.series.format(
        client.bucket,
        animeId,
        client.getQuery()
    ));
}

async function getSeasons(animeId) {
    return await makeRequest(urls.seasons.format(
        client.bucket,
        animeId,
        client.getQuery()
    ));
}

async function getEpisodes(seasonId) {
    return await makeRequest(urls.episodes.format(
        client.bucket,
        seasonId,
        client.getQuery()
    ));
}

async function getCategories(animeId) {
    return await makeRequest(urls.categories.format(
        animeId,
        client.getQuery()
    ));
}

async function getRate(animeId) {
    return await makeRequest(urls.rate.format(
        client.id,
        animeId
    ));
}

async function getSimilar(animeId, items = 10) {
    return await makeRequest(urls.similar.format(
        animeId,
        items,
        client.getQuery()
    ));
}

async function search(query) {
    return await makeRequest(urls.search.format(
        query,
        client.getQuery()
    ));
}

async function getAllAnimes(start = 0, items = 10, sortBy = "alphabetical") {
    //newly_added, alphabetically
    return await makeRequest(urls.getAllAnimes.format(
        sortBy,
        start,
        items,
        client.getQuery()
    ));
}

async function getNewsFeed() {
    return await makeRequest(urls.newsFeed.format(
        client.getQuery()
    ));
}

module.exports = {
    client,
    login,
    getProfile,
    getAnime,
    getSeasons,
    getEpisodes,
    getCategories,
    getRate,
    getSimilar,
    search,
    getAllAnimes,
    getNewsFeed
}