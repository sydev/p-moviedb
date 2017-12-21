import test from 'ava';

import MovieDB from '../index';

test('Construct the MovieDB class only with api_key', t => {
  const moviedb = new MovieDB({api_key: 'valid_string'});

  t.true(moviedb instanceof MovieDB);
  t.deepEqual(moviedb.getOptions(), {api_key: 'valid_string', language: 'en'});
});

test('Construct the MovieDB class with api_key and language', t => {
  const moviedb = new MovieDB({api_key: 'valid_string', language: 'de'});

  t.true(moviedb instanceof MovieDB);
  t.deepEqual(moviedb.getOptions(), {api_key: 'valid_string', language: 'de'});
});

test('Construct the MovieDB class with no api_key (throws error)', t => {
  const error = t.throws(() => new MovieDB({test: 'test'}), Error);

  t.is(error.message, '`options.api_key` is required.');
});

test('Construct the MovieDB class with an api_key which is not an string (throws error)', t => {
  let error;

  error = t.throws(() => new MovieDB({api_key: 123}), Error);
  t.is(error.message, '`options.api_key` must be a string.');

  error = t.throws(() => new MovieDB({api_key: true}), Error);
  t.is(error.message, '`options.api_key` must be a string.');

  error = t.throws(() => new MovieDB({api_key: {}}), Error);
  t.is(error.message, '`options.api_key` must be a string.');

  error = t.throws(() => new MovieDB({api_key: []}), Error);
  t.is(error.message, '`options.api_key` must be a string.');
});

test('Construct the MovieDB class with a parameter which is not a plain object (throws error)', t => {
  let error;

  error = t.throws(() => new MovieDB(123), Error);
  t.is(error.message, '`options` must be an object.');

  error = t.throws(() => new MovieDB(true), Error);
  t.is(error.message, '`options` must be an object.');

  error = t.throws(() => new MovieDB('123'), Error);
  t.is(error.message, '`options` must be an object.');

  error = t.throws(() => new MovieDB([]), Error);
  t.is(error.message, '`options` must be an object.');
});
