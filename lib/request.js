(() => {
  'use strict';

  const request   = require('r2');
  const urlParams = require('params-url');

  /**
   * 
   * @param {String} url 
   * @param {Object} data 
   * @param {String} method 
   */
  module.exports = async (url = '', data = {}, method = 'get') => {
    url = urlParams.add(url, data);
    
    return await request.get(url).json;
  };
})();
