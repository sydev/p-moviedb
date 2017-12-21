import test from 'ava';
import isObject from 'is-plain-object';

import parseItems from '../lib/parse-items';

const conf    = require('./data/configuration.json');
const movies  = require('./data/movies.json');
const shows   = require('./data/shows.json');

test('Parse movies', t => {
  const resultMovies = parseItems(movies, conf);
  
  resultMovies.forEach(movie => {
    t.true(movie.hasOwnProperty('backdrop_urls'));
    t.true(isObject(movie.backdrop_urls));

    t.true(movie.hasOwnProperty('poster_urls'));
    t.true(isObject(movie.poster_urls));
  });
});

test('Parse shows', t => {
  const resultShows = parseItems(shows, conf);

  resultShows.forEach(movie => {
    t.true(movie.hasOwnProperty('backdrop_urls'));
    t.true(isObject(movie.backdrop_urls));

    t.true(movie.hasOwnProperty('poster_urls'));
    t.true(isObject(movie.poster_urls));
  });
});
