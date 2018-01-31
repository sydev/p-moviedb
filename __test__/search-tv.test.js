import test from 'ava';

import MovieDB from '../index';

const api_key = process.env.API_KEY;
const _conf = require('./data/configuration.json');
const showKeys = [
  'original_name',
  'genre_ids',
  'name',
  'popularity',
  'origin_country',
  'vote_count',
  'first_air_date',
  'backdrop_path',
  'original_language',
  'id',
  'vote_average',
  'overview',
  'poster_path',
  'backdrop_urls',
  'poster_urls'
].sort();

test('Search tv shows with query `Big Bang Theory`', async t => {
  const moviedb = new MovieDB({ api_key });
  const shows = await moviedb.searchTv({ query: 'Big Bang Theory' });

  shows.forEach(show => {
    t.deepEqual(Object.keys(show).sort(), showKeys);
  });
});

test('Search tv shows without options (throws)', async t => {
  const moviedb = new MovieDB({ api_key });
  const error = await t.throws(moviedb.searchTv());

  t.is(error.message, '`options` must be an object.');
});

test('Search tv shows without query (throws)', async t => {
  const moviedb = new MovieDB({ api_key });
  const error = await t.throws(moviedb.searchTv({}));

  t.is(error.message, '`options.query` is required.');
});
