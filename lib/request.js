(() => {
  'use strict';

  const request = require('r2');
  const qs      = require('query-string');

  /**
   * 
   * @param {String} url 
   * @param {Object} data 
   * @param {String} method 
   */
  module.exports = async (url = '', data = {}, method = 'get') => {
    url = `${url}?${qs.stringify(data)}`;
    
    return await request.get(url).json;
  };
})();
