import test from 'ava';
import franc from 'franc-min';

import MovieDB from '../index';

const {api_key} = require('./config.json');
const _conf     = require('./data/configuration.json');
const movieKeys = ['vote_count', 'id', 'video', 'vote_average', 'title', 'popularity', 'poster_path', 'original_language', 'original_title', 'genre_ids', 'backdrop_path', 'adult', 'overview', 'release_date', 'backdrop_urls', 'poster_urls'].sort();

test('Discover movies', async t => {
  const moviedb = new MovieDB({api_key});
  const movies  = await moviedb.discoverMovies();

  movies.forEach(movie => {
    t.deepEqual(Object.keys(movie).sort(), movieKeys);
    if (movie.overview.length > 0) t.is(franc(movie.overview), 'eng');
  });
});

test('Discover movies in german (set language in constructor)', async t => {
  const moviedb = new MovieDB({api_key, language: 'de'});
  const movies  = await moviedb.discoverMovies();

  movies.forEach(movie => {
    t.deepEqual(Object.keys(movie).sort(), movieKeys);
    if (movie.overview.length > 0) t.is(franc(movie.overview), 'deu');
  });
});

test('Discover movies in german (set language in api call)', async t => {
  const moviedb = new MovieDB({api_key});
  const movies  = await moviedb.discoverMovies({language: 'de'});

  movies.forEach(movie => {
    t.deepEqual(Object.keys(movie).sort(), movieKeys);
    if (movie.overview.length > 0) t.is(franc(movie.overview), 'deu');
  });
});

test('Discover movies with overwritten language', async t => {
  const moviedb = new MovieDB({api_key, language: 'de'});
  const movies  = await moviedb.discoverMovies({language: 'it'});

  movies.forEach(movie => {
    t.deepEqual(Object.keys(movie).sort(), movieKeys);
    if (movie.overview.length > 0) t.is(franc(movie.overview), 'ita');
  });
});
