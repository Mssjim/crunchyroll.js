require('dotenv').config();
const cr = require('../main');

const loginCredentials = {
    email: process.env.EMAIL,
    password: process.env.PASSWORD
};

const testIds = {
    anime: 'G4PH0WXVJ',
    season: 'GY19CPXNV',
    episode: 'G9DUE19E9',
    animeSearch: 'naruto'
};

let loginResponse;

beforeAll(async () => {
    loginResponse = await cr.login(loginCredentials.email, loginCredentials.password);
});

describe('Crunchyroll API', () => {
    it('should export a object', () => {
        expect(cr).toBeInstanceOf(Object);
    });

    it('should export a object with the following properties', () => {
        expect(cr.client).toBeDefined();
        expect(cr.login).toBeDefined();
        expect(cr.getProfile).toBeDefined();
        expect(cr.getAnime).toBeDefined();
        expect(cr.getSeasons).toBeDefined();
        expect(cr.getEpisodes).toBeDefined();
        expect(cr.getCategories).toBeDefined();
        expect(cr.getRate).toBeDefined();
        expect(cr.getSimilar).toBeDefined();
        expect(cr.search).toBeDefined();
        expect(cr.getAllAnimes).toBeDefined();
        expect(cr.getNewsFeed).toBeDefined();
    });

    it('should export a login function', () => {
        expect(cr.login).toBeInstanceOf(Function);
    });

    it('should export a getProfile function', () => {
        expect(cr.getProfile).toBeInstanceOf(Function);
    });

    it('should export a getAnime function', () => {
        expect(cr.getAnime).toBeInstanceOf(Function);
    });

    it('should export a getSeasons function', () => {
        expect(cr.getSeasons).toBeInstanceOf(Function);
    });

    it('should export a getEpisodes function', () => {
        expect(cr.getEpisodes).toBeInstanceOf(Function);
    });

    it('should export a getCategories function', () => {
        expect(cr.getCategories).toBeInstanceOf(Function);
    });

    it('should export a getRate function', () => {
        expect(cr.getRate).toBeInstanceOf(Function);
    });

    it('should export a getSimilar function', () => {
        expect(cr.getSimilar).toBeInstanceOf(Function);
    });

    it('should export a search function', () => {
        expect(cr.search).toBeInstanceOf(Function);
    });

    it('should export a getAllAnimes function', () => {
        expect(cr.getAllAnimes).toBeInstanceOf(Function);
    });

    it('should export a getNewsFeed function', () => {
        expect(cr.getNewsFeed).toBeInstanceOf(Function);
    });
});

describe('Crunchyroll API - client', () => {
    it('should initialize the client with a time property', () => {
        expect(cr.client.time).toBeDefined();
    });

    it('should initialize the client with a getQuery method', () => {
        expect(cr.client.getQuery).toBeInstanceOf(Function);
    });
});

describe('Crunchyroll API - login', () => {
    it('should return a promise', () => {
        expect(cr.login()).toBeInstanceOf(Promise);
    });

    it('should return a object with sucess and client properties', async () => {
        expect(loginResponse.success).toBeDefined();
        expect(loginResponse.client).toBeDefined();
    });

    it('should return a object with success property set to true', async () => {
        expect(loginResponse.success).toBeTruthy();
    });

    it('should return a object with client property set to an object', async () => {
        expect(loginResponse.client).toBeInstanceOf(Object);
    });

    it('should return a object with client property set to an object with the following properties', async () => {
        expect(loginResponse.client.login).toBeDefined();
        expect(loginResponse.client.locale).toBeDefined();
        expect(loginResponse.client.time).toBeDefined();

        expect(loginResponse.client.id).toBeDefined();
        expect(loginResponse.client.access_token).toBeDefined();
        expect(loginResponse.client.refresh_token).toBeDefined();

        expect(loginResponse.client.bucket).toBeDefined();
        expect(loginResponse.client.cms).toBeDefined();
        expect(loginResponse.client.getQuery).toBeDefined();
    });
    
    it('should return a object with client property set to an object with the following properties', async () => {
        expect(loginResponse.client.time).toBeGreaterThan(0);
        expect(loginResponse.client.login.email).toEqual(loginCredentials.email);
        expect(loginResponse.client.login.password).toEqual(loginCredentials.password);
        expect(loginResponse.client.locale).toEqual('en-US');
        
        expect(loginResponse.client.id).toMatch(/[a-zA-Z0-9_-]+/);
        expect(loginResponse.client.access_token).toMatch(/Bearer [a-zA-Z0-9_-]+/);
        expect(loginResponse.client.refresh_token).toMatch(/[a-zA-Z0-9_-]+/);

        expect(loginResponse.client.bucket).toMatch(/[a-zA-Z0-9_-]+/);
    });


    it('should return a object with client property set to an object with the following cms properties', async () => {
        expect(loginResponse.client.cms.bucket).toBeDefined();
        expect(loginResponse.client.cms.policy).toBeDefined();
        expect(loginResponse.client.cms.signature).toBeDefined();
        expect(loginResponse.client.cms.key_pair_id).toBeDefined();
        expect(loginResponse.client.cms.expires).toBeDefined();
    });

    it('should return a object with client property set to an object with the following cms properties with the following format', async () => {
        expect(loginResponse.client.cms.bucket).toMatch(/\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/-/);
        expect(loginResponse.client.cms.key_pair_id).toMatch(/[a-zA-Z0-9_-]+/);
        expect(loginResponse.client.cms.expires).toMatch(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z/);
    });

    it('should return a object with client property set to an object with the getQuery method', async () => {
        expect(loginResponse.client.getQuery).toBeInstanceOf(Function);
    });

    it('should return a object with client property set to an object with the getQuery method that returns a string', async () => {
        expect(loginResponse.client.getQuery()).toBeInstanceOf(String);
    });
});

describe('Crunchyroll API - getProfile', () => {
    let profile;
    beforeAll(async () => {
        profile = await cr.getProfile();
    });

    it('should return a promise', () => {
        expect(cr.getProfile()).toBeInstanceOf(Promise);
    });
    
    it('should return a object with following properties', async () => {
        expect(profile.avatar).toBeDefined();
        expect(profile.cr_beta_opt_in).toBeDefined();
        expect(profile.crleg_email_verified).toBeDefined();
        expect(profile.do_not_sell).toBeDefined();
        expect(profile.email).toBeDefined();
        expect(profile.extended_maturity_rating).toBeDefined();
        expect(profile.maturity_rating).toBeDefined();
        expect(profile.preferred_communication_language).toBeDefined();
        expect(profile.preferred_content_subtitle_language).toBeDefined();
        expect(profile.profile_name).toBeDefined();
        expect(profile.qa_user).toBeDefined();
        expect(profile.username).toBeDefined();
    });
});

describe('Crunchyroll API - getAnime', () => {
    let anime;
    beforeAll(async () => {
        anime = await cr.getAnime(testIds.anime);
    });

    it('should return a promise', () => {
        expect(cr.getAnime()).toBeInstanceOf(Promise);
    });

    it('should return a object with following properties', async () => {
        expect(anime).toBeDefined();
        expect(anime.__class__).toBeDefined();
        expect(anime.id).toBeDefined();
        expect(anime.title).toBeDefined();
        expect(anime.slug).toBeDefined();
        expect(anime.slug_title).toBeDefined();
        expect(anime.description).toBeDefined();
        expect(anime.extended_description).toBeDefined();
        expect(anime.keywords).toBeDefined();
        expect(anime.images).toBeDefined();

        expect(anime.__class__).toEqual('series');
    });
});

describe('Crunchyroll API - getSeasons', () => {
    let seasons;
    beforeAll(async () => {
        seasons = await cr.getSeasons(testIds.anime);
    });

    it('should return a promise', () => {
        expect(cr.getSeasons()).toBeInstanceOf(Promise);
    });

    it('should return a object with following properties', async () => {
        expect(seasons).toBeDefined();
        expect(seasons.__class__).toBeDefined();
        expect(seasons.items).toBeDefined();
        expect(seasons.total).toBeDefined();

        expect(seasons.__class__).toEqual('collection');
        expect(seasons.items).toBeInstanceOf(Array);
    });
});

describe('Crunchyroll API - getEpisodes', () => {
    let episodes;
    beforeAll(async () => {
        episodes = await cr.getEpisodes(testIds.season);
    });

    it('should return a promise', () => {
        expect(cr.getEpisodes()).toBeInstanceOf(Promise);
    });

    it('should return a object with following properties', async () => {
        expect(episodes).toBeDefined();
        expect(episodes.__class__).toBeDefined();
        expect(episodes.items).toBeDefined();
        expect(episodes.total).toBeDefined();

        expect(episodes.__class__).toEqual('collection');
        expect(episodes.items).toBeInstanceOf(Array);
    });
});

describe('Crunchyroll API - getCategories', () => {
    let categories;
    beforeAll(async () => {
        categories = await cr.getCategories(testIds.anime);
    });

    it('should return a promise', () => {
        expect(cr.getCategories()).toBeInstanceOf(Promise);
    });

    it('should return a object with following properties', async () => {
        expect(categories).toBeDefined();
        expect(categories.items).toBeDefined();
        expect(categories.total).toBeDefined();

        expect(categories.items).toBeInstanceOf(Array);
    });
});

describe('Crunchyroll API - getRate', () => {
    let rate;
    beforeAll(async () => {
        rate = await cr.getRate(testIds.anime);
    });

    it('should return a promise', () => {
        expect(cr.getRate()).toBeInstanceOf(Promise);
    });

    it('should return a object with following properties', async () => {
        expect(rate).toBeDefined();
        expect(rate.rating).toBeDefined();
        expect(rate.total).toBeDefined();
        expect(rate.average).toBeDefined();
    });
});

describe('Crunchyroll API - getSimilar', () => {
    let similar;
    beforeAll(async () => {
        similar = await cr.getSimilar(testIds.anime);
    });

    it('should return a promise', () => {
        expect(cr.getSimilar()).toBeInstanceOf(Promise);
    });

    it('should return a object with following properties', async () => {
        expect(similar).toBeDefined();
        expect(similar.__class__).toBeDefined();
        expect(similar.items).toBeDefined();
        expect(similar.total).toBeDefined();

        expect(similar.__class__).toEqual('similar_to');
        expect(similar.items).toBeInstanceOf(Array);
    });
});

describe('Crunchyroll API - search', () => {
    let search;
    beforeAll(async () => {
        search = await cr.search(testIds.animeSearch);
    });

    it('should return a promise', () => {
        expect(cr.search()).toBeInstanceOf(Promise);
    });

    it('should return a object with following properties', async () => {
        expect(search).toBeDefined();
        expect(search.__class__).toBeDefined();
        expect(search.items).toBeDefined();
        expect(search.total).toBeDefined();

        expect(search.__class__).toEqual('collection');
        expect(search.items).toBeInstanceOf(Array);
    });
});

describe('Crunchyroll API - getAllAnimes', () => {
    let allAnimes;
    beforeAll(async () => {
        allAnimes = await cr.getAllAnimes();
    });

    it('should return a promise', () => {
        expect(cr.getAllAnimes()).toBeInstanceOf(Promise);
    });

    it('should return a object with following properties', async () => {
        expect(allAnimes).toBeDefined();
        expect(allAnimes.__class__).toBeDefined();
        expect(allAnimes.items).toBeDefined();
        expect(allAnimes.total).toBeDefined();

        expect(allAnimes.__class__).toEqual('disc_browse');
        expect(allAnimes.items).toBeInstanceOf(Array);
    });
});

describe('Crunchyroll API - getNewsFeed', () => {
    let newsFeed;
    beforeAll(async () => {
        newsFeed = await cr.getNewsFeed();
    });

    it('should return a promise', () => {
        expect(cr.getNewsFeed()).toBeInstanceOf(Promise);
    });

    it('should return a object with following properties', async () => {
        expect(newsFeed).toBeDefined();
        expect(newsFeed.__class__).toBeDefined();
        expect(newsFeed.top_news).toBeDefined();
        expect(newsFeed.latest_news).toBeDefined();

        expect(newsFeed.__class__).toEqual('news_feed');
        expect(newsFeed.top_news).toBeInstanceOf(Object);
        expect(newsFeed.latest_news).toBeInstanceOf(Object);

        expect(newsFeed.top_news.total).toBeDefined();
        expect(newsFeed.top_news.items).toBeDefined();

        expect(newsFeed.latest_news.total).toBeDefined();
        expect(newsFeed.latest_news.items).toBeDefined();

        expect(newsFeed.top_news.items).toBeInstanceOf(Array);
        expect(newsFeed.latest_news.items).toBeInstanceOf(Array);
    });
});