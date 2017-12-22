import test from 'ava';

import MovieDB from '../index';

const api_key   = process.env.API_KEY;
const _conf     = require('./data/configuration.json');
const movieKeys = ['vote_count', 'id', 'video', 'vote_average', 'title', 'popularity', 'poster_path', 'original_language', 'original_title', 'genre_ids', 'backdrop_path', 'adult', 'overview', 'release_date', 'backdrop_urls', 'poster_urls'].sort();


test('Search movie with query `The Avengers`', async t => {
  const moviedb = new MovieDB({api_key});
  const movies  = await moviedb.searchMovie({query: 'The Avengers'});

  movies.forEach(movie => {
    t.deepEqual(Object.keys(movie).sort(), movieKeys);
  });
});

test('Search movie without options (throws)', async t => {
  const moviedb = new MovieDB({api_key});
  const error   = await t.throws(moviedb.searchMovie());

  t.is(error.message, '`options` must be an object.');
});

test('Search movie without query (throws)', async t => {
  const moviedb = new MovieDB({api_key});
  const error   = await t.throws(moviedb.searchMovie({}));

  t.is(error.message, '`options.query` is required.');
});
