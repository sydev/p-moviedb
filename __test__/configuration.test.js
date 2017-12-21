import test from 'ava';
import isObject from 'is-plain-object';

import MovieDB from '../index';

const api_key = process.env.API_KEY;


const configKeys = ['images', 'change_keys'].sort();
const imagesKeys = ['base_url', 'secure_base_url', 'backdrop_sizes', 'logo_sizes', 'poster_sizes', 'profile_sizes', 'still_sizes'].sort();

test('Get configuration', async t => {
  const moviedb = new MovieDB({api_key});
  const conf    = await moviedb.getConfiguration();

  t.deepEqual(Object.keys(conf).sort(), configKeys);
  t.deepEqual(Object.keys(conf.images).sort(), imagesKeys);
  t.deepEqual(moviedb._configuration, conf);
});
