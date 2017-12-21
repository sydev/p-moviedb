import test from 'ava';
import franc from 'franc-min';

import MovieDB from '../index';

const resultKeys  = ['page', 'total_results', 'total_pages', 'results'].sort();
const showKeys    = ['original_name', 'genre_ids', 'name', 'popularity', 'origin_country', 'vote_count', 'first_air_date', 'backdrop_path', 'original_language', 'id', 'vote_average', 'overview', 'poster_path'].sort();

test.beforeEach(t => {
  t.context.api_key = require('./config.json').api_key;
});

test('Discover tv shows', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key});
  const response  = await moviedb.discoverTv();

  t.deepEqual(Object.keys(response).sort(), resultKeys);

  response.results.forEach(show => {
    t.deepEqual(Object.keys(show).sort(), showKeys);
  });
});

test('Discover tv shows in german (set language in constructor)', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key, language: 'de'});
  const response  = await moviedb.discoverTv();

  t.deepEqual(Object.keys(response).sort(), resultKeys);

  response.results.forEach(show => {
    t.deepEqual(Object.keys(show).sort(), showKeys);
    if (show.overview.length > 0) t.is(franc(show.overview), 'deu');
  });
});

test('Discover tv shows in german (set language in api call)', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key});
  const response  = await moviedb.discoverTv({language: 'de'});

  t.deepEqual(Object.keys(response).sort(), resultKeys);

  response.results.forEach(show => {
    t.deepEqual(Object.keys(show).sort(), showKeys);
    if (show.overview.length > 0) t.is(franc(show.overview), 'deu');
  });
});

test('Discover tv shows with overwritten language', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key, language: 'de'});
  const response  = await moviedb.discoverTv({language: 'it'});

  t.deepEqual(Object.keys(response).sort(), resultKeys);

  response.results.forEach(show => {
    t.deepEqual(Object.keys(show).sort(), showKeys);
    if (show.overview.length > 0) t.is(franc(show.overview), 'ita');
  });
});
