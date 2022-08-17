<div align="center">
  <br />
  <p>
    <img src="./logo.png" width="800" alt="crunchyroll.js" />
  </p>
  <br />
  <p>
    <a href="https://www.npmjs.com/package/crunchyroll.js"><img src="https://img.shields.io/npm/v/crunchyroll.js.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/crunchyroll.js"><img src="https://img.shields.io/npm/dt/crunchyroll.js.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://github.com/Mssjim/crunchyroll.js"><img src="https://badge.fury.io/gh/Mssjim%2Fcrunchyroll.js.svg" alt="GitHub Version" /></a>
    <a href="https://github.com/Mssjim/crunchyroll.js/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Mssjim/crunchyroll.js.svg" alt="GitHub Version" /></a>
  </p>
</div>

## About
crunchyroll.js is an npm module that allows you to easily access the Crunchyroll API.

## Warning
This project is not affiliated with or endorsed by Crunchyroll. The use of this project may violate the terms of service between you and stream provider. Use with caution and at your own risk.

## Installation 
```bash
npm i crunchyroll.js
```

## Basic Usage
```js
const cr = require('crunchyroll.js');

(async () => {
    // Login to crunchyroll
    await cr.login(email, password);

    // Get anime info
    const anime = await cr.getAnime("GY9PJ5KWR"); // "Naruto"
    
    // Get anime seasons and eps
    const { items: seasons } = await cr.getSeasons(anime.id);
    const eps = await cr.getEps(seasons[0].id);
})();
```

## Examples
• Change default language
```js
await cr.login(email, password, "pt-BR");
```

• Get user profile
```js
const profile = await cr.getProfile();
```

• Search anime/episode/movie
```js
const search = await cr.search("naruto");
```

• Get anime info
```js
const categories = await cr.getCategories("[anime-id]");
const rate = await cr.getRate("[anime-id]");
const similar = await cr.getSimilar("[anime-id]", 10);
```

• Get NewsFeed
```js
const newsFeed = await cr.getNewsFeed();
console.log(newsFeed.latest_news.items[0]); // Log the latest
```

• Get last updated animes list
```js
// Get last 10 animes
const { items } = await cr.getAllAnimes(0, 10, "newly_added");
// Log animes title
console.log(items.map(anime => anime.title));
```

• Basic episodes counting system by anime seasons
```js
const anime = await cr.getAnime("GY9PJ5KWR");
const { items: seasons } = await cr.getSeasons(anime.id);
console.log(`${anime.title} Seasons:`);
for(season of seasons) {
    const episodes = await cr.getEpisodes(season.id);
    console.log(`${season.title}: ${episodes.total} eps`);
}
```

## Contributing - bug fixes
Contributions are welcome! Please feel free to open an issue or submit a pull request, for bug fixes or new features.

1. Fork the repository
2. Create a new branch `git checkout -b <new-feature-name>`
3. Make the changes
4. Commit the changes `git commit -am "Add new feature"`
5. Push the changes `git push origin <new-feature-name>`
6. Create a pull request on GitHub

Many thanks!
