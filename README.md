# Crunchyroll API

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
    const categories = await cr.getCategories(anime.id);
    const rate = await cr.getRate(anime.id);
    const similar = await cr.getSimilar(anime.id, 20);

    // Search anime/episodes/movies
    const search = await cr.search("naruto");

    // Get last updated anime list
    const { items: lastTenAnimes } = await cr.getAllAnimes(0, 10, "newly_added");
    console.log(lastTenAnimes.map(anime => anime.title)); // Log animes title
    
    // Get anime seasons and eps
    const { items: seasons } = await cr.getSeasons(anime.id);
    const eps = await cr.getEps(seasons[0].id);

    // Get NewsFeed
    const newsFeed = await cr.getNewsFeed();
    console.log(newsFeed.latest_news.items[0]); // Log lastest news
})();
```

## Examples
```js
// Change default language
await cr.login(email, password, "pt-BR");

// Get user profile
const profile = await cr.getProfile();

// Basic episodes counting system by anime seasons
const anime = await cr.getAnime("GY9PJ5KWR");
const { items: seasons } = await cr.getSeasons(anime.id);
console.log(`\n${anime.title} Seasons:`);
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
