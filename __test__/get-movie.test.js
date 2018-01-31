import test from 'ava';

import MovieDB from '../index';

const api_key   = process.env.API_KEY;
const _conf     = require('./data/configuration.json');
const movieKeys = [
  'vote_count', 
  'id', 
  'video', 
  'vote_average', 
  'title', 
  'popularity', 
  'poster_path', 
  'original_language', 
  'original_title', 
  'backdrop_path', 
  'adult', 
  'overview', 
  'release_date', 
  'backdrop_urls', 
  'poster_urls',
  'belongs_to_collection', 
  'budget', 
  'homepage',
  'imdb_id',
  'production_companies',
  'production_countries',
  'revenue',
  'runtime',
  'spoken_languages',
  'status',
  'tagline',
  'genres'
].sort();

/*** SHOULD SUCCESS ***/

test('Get movie with id 346364', async t => {
  const moviedb = new MovieDB({api_key});
  const movie   = await moviedb.getMovie({id: 346364});

  t.deepEqual(Object.keys(movie).sort(), movieKeys);
});


/*** SHOULD FAIL ****/

test('Get movie with id 1 (Not Found)', async t => {
  const moviedb = new MovieDB({api_key});
  const error   = await t.throws(moviedb.getMovie({id: 1}));

  t.is(error.message, 'The resource you requested could not be found.');
});

test('Get movie with id 0', async t => {
  const moviedb = new MovieDB({api_key});
  const error   = await t.throws(moviedb.getMovie({id: 0}));

  t.is(error.message, '`options.id` must be an integer greater than 0.');
});

test('Get movie with id -1', async t => {
  const moviedb = new MovieDB({api_key});
  const error   = await t.throws(moviedb.getMovie({id: -1}));

  t.is(error.message, '`options.id` must be an integer greater than 0.');
});

test('Get movie without options', async t => {
  const moviedb = new MovieDB({api_key});
  const error   = await t.throws(moviedb.getMovie());

  t.is(error.message, '`options` must be an object.');
});

test('Get movie with id `1234` (string)', async t => {
  const moviedb = new MovieDB({api_key});
  const error   = await t.throws(moviedb.getMovie({id: '1234'}));

  t.is(error.message, '`options.id` must be an integer greater than 0.');
});
