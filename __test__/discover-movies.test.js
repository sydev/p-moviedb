import test from 'ava';
import franc from 'franc-min';

import MovieDB from '../index';

const resultKeys  = ['page', 'total_results', 'total_pages', 'results'].sort();
const movieKeys   = ['vote_count', 'id', 'video', 'vote_average', 'title', 'popularity', 'poster_path', 'original_language', 'original_title', 'genre_ids', 'backdrop_path', 'adult', 'overview', 'release_date'].sort();

test.beforeEach(t => {
  t.context.api_key = require('./config.json').api_key;
});

test('Discover movies', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key});
  const response  = await moviedb.discoverMovie();

  t.deepEqual(Object.keys(response).sort(), resultKeys);

  response.results.forEach(movie => {
    t.deepEqual(Object.keys(movie).sort(), movieKeys);
  });
});

test('Discover movies in german (set language in constructor)', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key, language: 'de'});
  const response  = await moviedb.discoverMovie();

  t.deepEqual(Object.keys(response).sort(), resultKeys);

  response.results.forEach(movie => {
    t.deepEqual(Object.keys(movie).sort(), movieKeys);
    if (movie.overview.length > 0) t.is(franc(movie.overview), 'deu');
  });
});

test('Discover movies in german (set language in api call)', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key});
  const response  = await moviedb.discoverMovie({language: 'de'});

  t.deepEqual(Object.keys(response).sort(), resultKeys);

  response.results.forEach(movie => {
    t.deepEqual(Object.keys(movie).sort(), movieKeys);
    if (movie.overview.length > 0) t.is(franc(movie.overview), 'deu');
  });
});

test('Discover movies with overwritten language', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key, language: 'de'});
  const response  = await moviedb.discoverMovie({language: 'it'});

  t.deepEqual(Object.keys(response).sort(), resultKeys);

  response.results.forEach(movie => {
    t.deepEqual(Object.keys(movie).sort(), movieKeys);
    if (movie.overview.length > 0) t.is(franc(movie.overview), 'ita');
  });
});
