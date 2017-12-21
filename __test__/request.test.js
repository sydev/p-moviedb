import test from 'ava';

import request from '../lib/request';

const api_key = process.env.API_KEY;
const expect  = {status_code: 34, status_message: 'The resource you requested could not be found.'};

test('request', async t => {
  const response = await request('https://api.themoviedb.org/3/movie/1', {api_key});

  t.deepEqual(expect, response);
});
