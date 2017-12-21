(() => {
  'use strict';

  const isObject  = require('is-plain-object');
  const paramsUrl = require('params-url');

  const request   = require('./lib/request');
  const {baseUrl} = require('./constants');


  /**
   * @type {Object} Options
   * @prop {String} api_key The API key for https://www.themoviedb.org/
   * @prop {String} [language='en'] An ISO-639-1 or ISO-3166-1 language code. Example: "en-US" or "en"
   */
  const defaultOptions = {
    api_key: null,
    language: 'en'
  };

  /**
   * @type {Object} ErrorResponse
   * @prop {Number} status_code The error code
   * @prop {String} status_message The error message
   * @prop {Boolean} success 
   */

  


  /**
   * The MovieDB class
   * 
   * @class MovieDB
   */
  class MovieDB {

    /**
     * Creates an instance of MovieDB.
     * @param {any} options 
     * 
     * @memberOf MovieDB
     */
    constructor(options) {
      if (!isObject(options)) throw new Error('`options` must be an object.');
      else if (!options.api_key) throw new Error('`options.api_key` is required.');
      else if (typeof options.api_key !== 'string') throw new Error('`options.api_key` must be a string.');
      
      this.options = Object.assign({}, defaultOptions, options);
    }

    /**
     * Get the options object
     * 
     * @returns {Options}
     * 
     * @memberOf MovieDB
     */
    getOptions() {
      return this.options;
    }



    /*** DISCOVER ***/

    /**
     * Discover movies
     * 
     * @param {any} options 
     * @returns {Promise<Response|ErrorResponse>}
     * 
     * @memberOf MovieDB
     */
    async discoverMovie(options) {
      options = Object.assign({}, this.options, options);
      let url = paramsUrl.generate(`${baseUrl}/discover/movie`, options);

      return await request(url);
    }

    /**
     * Discover tv shows
     * 
     * @param {any} options
     * @returns {Promise<Response|ErrorResponse>}
     * 
     * @memberOf MovieDB
     */
    async discoverTv(options) {
      options = Object.assign({}, this.options, options);
      let url = paramsUrl.generate(`${baseUrl}/discover/tv`, options);

      return await request(url);
    }

    /*** SEARCH ***/

    /**
     * Search for movies
     * 
     * @param {any} options 
     * 
     * @memberOf MovieDB
     */
    async searchMovie(options) {
      if (!isObject(options)) throw new Error('`options` must be an object.');
      else if (!options.query) throw new Error('`options.query` is required.');

      options = Object.assign({}, this.options, options);
      let url = paramsUrl.generate(`${baseUrl}/search/movie`, options);

      return await request(url);
    }
  }

  module.exports = MovieDB;

})();
