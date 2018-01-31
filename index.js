(() => {
  'use strict';

  const isObject  = require('is-plain-object');
  const qs        = require('query-string');

  const parseItem   = require('./lib/parse-item');
  const parseItems  = require('./lib/parse-items');
  const request     = require('./lib/request');
  const {baseUrl}   = require('./constants');


  /**
   * @type {Options}
   * @prop {String} api_key The API key for https://www.themoviedb.org/
   * @prop {String} [language='en'] An ISO-639-1 or ISO-3166-1 language code. Example: "en-US" or "en"
   */

  /**
   * @const {Options} defaultOptions
   */
  const defaultOptions = {
    api_key: null,
    language: 'en'
  };

  /**
   * @type {ErrorResponse}
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
     * @param {Options} options 
     * 
     * @memberOf MovieDB
     */
    constructor(options) {
      if (!isObject(options)) throw new Error('`options` must be an object.');
      else if (!options.api_key) throw new Error('`options.api_key` is required.');
      else if (typeof options.api_key !== 'string') throw new Error('`options.api_key` must be a string.');
      
      // Public properties
      this.options = Object.assign({}, defaultOptions, options);

      // Private properties
      this._configuration = null
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


    /*** CONFIGURATION ***/

    /**
     * Get the configuration from https://themoviedb.org. 
     * If the request was successful, the response is saved in the class for internal usage.
     * You must call this method right after initializing the class and before any other method call.
     * 
     * @returns {Promise<Response|ErrorResponse>}
     * 
     * @memberOf MovieDB
     */
    async getConfiguration() {
      if (this._configuration) return this._configuration;

      try {
        const url = `${baseUrl}/configuration`;
        const res = await request(url, this.options);

        if (!res.status_code) {
          this._configuration = res;
          return res;
        }
        else throw new Error(res.status_message);
      } catch (err) {
        throw err;
      }
    }

    /**
     * Set the configuration manually. (Not recommned)
     * 
     * @param {Object} config 
     * 
     * @memberOf MovieDB
     */
    setConfiguration(config) {
      if (!isObject(config)) throw new Error('`config` must be an object.');

      this._configuration = config;
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
    async discoverMovies(options = {}) {
      if (!isObject(options)) throw new Error('`options` must be an object.');

      options = Object.assign({}, this.options, options);

      try {
        const url  = `${baseUrl}/discover/movie`;
        const conf = await this.getConfiguration();
        const res  = await request(url, options);

        if (res.results) return parseItems(res.results, conf);
        else throw new Error(res.status_message);
      } catch (err) {
        throw err;
      }
    }

    /**
     * Discover tv shows
     * 
     * @param {any} options
     * @returns {Promise<Response|ErrorResponse>}
     * 
     * @memberOf MovieDB
     */
    async discoverTv(options = {}) {
      if (!isObject(options)) throw new Error('`options` must be an object.');

      options = Object.assign({}, this.options, options);

      try {
        const url  = `${baseUrl}/discover/tv`;
        const conf = await this.getConfiguration();
        const res  = await request(url, options);

        if (res.results) return parseItems(res.results, conf);
        else throw new Error(res.status_message);
      } catch (err) {
        throw err;
      }
    }

    /*** SEARCH ***/

    /**
     * Search for movies
     * 
     * @param {Object} options 
     * @returns {Promise<Response|ErrorResponse>}
     * 
     * @memberOf MovieDB
     */
    async searchMovie(options) {
      if (!isObject(options)) throw new Error('`options` must be an object.');
      else if (!options.query) throw new Error('`options.query` is required.');

      options = Object.assign({}, this.options, options);

      try {
        const url  = `${baseUrl}/search/movie`;
        const conf = await this.getConfiguration();
        const res  = await request(url, options);

        if (res.results) return parseItems(res.results, conf);
        else throw new Error(res.status_message);
      } catch (err) {
        throw err;
      }
    }


    /**
     * Search for tv shows.
     * 
     * @param {Object} options 
     * @returns {Promise<Response|ErrorResponse>}
     * 
     * @memberOf MovieDB
     */
    async searchTv(options) {
      if (!isObject(options)) throw new Error('`options` must be an object.');
      else if (!options.query) throw new Error('`options.query` is required.');

      options = Object.assign({}, this.options, options);

      try {
        const url  = `${baseUrl}/search/tv`;
        const conf = await this.getConfiguration();
        const res  = await request(url, options);

        if (res.results) return parseItems(res.results, conf);
        else throw new Error(res.status_message);
      } catch (err) {
        throw err;
      }
    }




    /*** MOVIE ***/

    /**
     * Get the details for a movie by its id.
     * 
     * @param {Object} options 
     * @returns {Promise<Response|ErrorResponse>}
     * 
     * @memberOf MovieDB
     */
    async getMovie(options) {
      if (!isObject(options)) throw new Error('`options` must be an object.');
      else if (typeof options.id === 'undefined' || options.id === null) throw new Error('`options.id` is required.');
      else if (!Number.isInteger(options.id) || options.id <= 0) throw new Error('`options.id` must be an integer greater than 0.');

      options = Object.assign({}, this.options, options);

      try {
        const url  = `${baseUrl}/movie/${options.id}`;
        const conf = await this.getConfiguration();
        const res  = await request(url, options);

        if (!res.status_code) return parseItem(res, conf);
        else throw new Error(res.status_message);
      } catch (err) {
        throw err;
      }
    }
  }

  module.exports = MovieDB;

})();
