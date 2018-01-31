(() => {
  'use strict';

  const isObject = require('is-plain-object');

  const parseItem = require('./parse-item');

  /**
   * Parse an array of MediaItems.
   * 
   * @param {MediaItem[]} mediaItems 
   * @param {Object} configuration 
   */
  module.exports = (mediaItems = [], configuration) => {
    let i = 0,
      len = mediaItems.length;

    for (; i < len; i++) mediaItems[i] = parseItem(mediaItems[i], configuration);

    return mediaItems;
  };

})();
