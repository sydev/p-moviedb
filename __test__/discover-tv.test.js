import test from 'ava';
import franc from 'franc-min';

import MovieDB from '../index';

const api_key   = process.env.API_KEY;
const _conf     = require('./data/configuration.json');
const showKeys  = ['original_name', 'genre_ids', 'name', 'popularity', 'origin_country', 'vote_count', 'first_air_date', 'backdrop_path', 'original_language', 'id', 'vote_average', 'overview', 'poster_path', 'backdrop_urls', 'poster_urls'].sort();


test('Discover tv shows', async t => {
  const moviedb = new MovieDB({api_key});
  const shows   = await moviedb.discoverTv();

  shows.forEach(show => {
    t.deepEqual(Object.keys(show).sort(), showKeys);
  });
});

test('Discover tv shows in german (set language in constructor)', async t => {
  const moviedb = new MovieDB({api_key, language: 'de'});
  const shows   = await moviedb.discoverTv();

  shows.forEach(show => {
    t.deepEqual(Object.keys(show).sort(), showKeys);
    if (show.overview.length > 0) t.is(franc(show.overview), 'deu');
  });
});

test('Discover tv shows in german (set language in api call)', async t => {
  const moviedb = new MovieDB({api_key});
  const shows   = await moviedb.discoverTv({language: 'de'});

  shows.forEach(show => {
    t.deepEqual(Object.keys(show).sort(), showKeys);
    if (show.overview.length > 0) t.is(franc(show.overview), 'deu');
  });
});

test('Discover tv shows with overwritten language', async t => {
  const moviedb = new MovieDB({api_key, language: 'de'});
  const shows   = await moviedb.discoverTv({language: 'it'});

  shows.forEach(show => {
    t.deepEqual(Object.keys(show).sort(), showKeys);
    if (show.overview.length > 0) t.is(franc(show.overview), 'ita');
  });
});
