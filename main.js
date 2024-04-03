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
    if(!client.login)
        throw new Error('You must login first');
    if(Date.now() - client.time > 1000*60*4)
        await login(client.login.email, client.login.password);
}

async function makeRequest(url) {
    await checkLogin();
    const { body } = await fetch('GET', url, {
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
        'Authorization': "Basic b2VkYXJteHN0bGgxanZhd2ltbnE6OWxFaHZIWkpEMzJqdVY1ZFc5Vk9TNTdkb3BkSnBnbzE=",
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    };

    const data = new URLSearchParams({
        'username': email,
        'password': password,
        'grant_type': 'password',
        'scope': 'offline_access'
    });

    try {
        if(!email || !password)
            throw new Error('Email and password are required');
        const { body } = await fetch('POST', urls.token, headers, data.toString());

        if (body.error)
            throw new Error(body.error);
    
        if (!body.account_id)
            throw new Error('Invalid credentials');
    
        client.id = body.account_id;
        client.access_token = `${body.token_type} ${body.access_token}`;
        client.refresh_token = body.refresh_token;
    
        return {
            success: true,
            message: 'Login successful',
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

async function authenticate() {
    const headers = {
        'Authorization': client.access_token,
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    };

    try {
        const { body } = await fetch('GET', urls.index, headers);
        if (body.error)
            throw new Error(body.error);
    
        client.bucket = body.cms.bucket;
        client.cms = body.cms;
        client.getQuery = () => `Signature=${client.cms.signature}&Policy=${client.cms.policy}&Expires=${client.cms.expires}&Key-Pair-Id=${client.cms.key_pair_id}&locale=${client.locale}`;

        return {
            success: true,
            message: 'Authenticated'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

async function login(email, password, locale = 'en-US') {
    client.locale = locale;
    try {
        const getTokenResult = await getToken(email, password);
        if (!getTokenResult.success)
            throw new Error(getTokenResult.message + " - Check your credentials.");
    
        const authenticateResult = await authenticate();
        if (!authenticateResult.success)
            throw new Error(authenticateResult.message + " - Error authenticating.");
        
        client.time = Date.now();
        client.login = { email, password };

        return {
            success: true,
            message: 'Login successful',
            client
        };
    } catch (error) {
        client.login = { email, password };
        return {
            success: false,
            message: error.message,
            client
        };
    }
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