import test from 'ava';

import MovieDB from '../index';

let request_token = null;

const resultKeys  = ['page', 'total_results', 'total_pages', 'results'].sort();
const movieKeys   = ['vote_count', 'id', 'video', 'vote_average', 'title', 'popularity', 'poster_path', 'original_language', 'original_title', 'genre_ids', 'backdrop_path', 'adult', 'overview', 'release_date'].sort();

test.beforeEach(t => {
  t.context.api_key = require('./config.json').api_key;
});

test('Search movie with query `The Avengers`', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key});
  const response  = await moviedb.searchMovie({query: 'The Avengers'});

  t.deepEqual(Object.keys(response).sort(), resultKeys);

  response.results.forEach(movie => {
    t.deepEqual(Object.keys(movie).sort(), movieKeys);
  });
});

test('Search movie without options (throws)', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key});
  const error     = await t.throws(moviedb.searchMovie());

  t.is(error.message, '`options` must be an object.');
});

test('Search movie without query (throws)', async t => {
  const moviedb   = new MovieDB({api_key: t.context.api_key});
  const error     = await t.throws(moviedb.searchMovie({}));

  t.is(error.message, '`options.query` is required.');
});
