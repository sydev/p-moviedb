(() => {
  'use strict';

  const {baseUrl} = require('../../constants');
  const request   = require('../request');

  /**
   * @type {Object} DiscoverMovieOptions
   * 
   */

  /**
   * 
   * @param {DiscoverMovieOptions} options 
   */
  const movies = async (options = {}) => {
    let url = `${baseUrl}/discover/movie`;

    return await request(url, options);
  };

  /**
   * 
   * @param {*} options 
   */
  const tv = async (options = {}) => {
    let url = `${baseUrl}/discover/tv`;

    return await request(url, this.options);
  };

  const test = async (options = {}) => {
    let self = this;

    return self;
  };

  module.exports = {
    movies,
    tv,
    test
  };

})();
