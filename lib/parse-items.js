(() => {
  'use strict';

  const isObject = require('is-plain-object');

  /**
   * 
   * @param {MediaItem[]} mediaItems 
   * @param {Object} configuration 
   */
  module.exports = (mediaItems = [], configuration) => {
    let error;

    if (!configuration) error = '`configuration` must be provided.';
    if (!isObject(configuration)) error = '`configuration` must be an object.';
    if (!configuration.images) error = '`configuration.images` must be provided.';

    let i       = 0,
      len       = mediaItems.length,
      imageConf = configuration.images,
      item;

    for (; i < len; i++) {
      item                = mediaItems[i];
      item.backdrop_urls  = {};
      item.poster_urls    = {};

      imageConf.backdrop_sizes.forEach(size => {
        item.backdrop_urls[size] = imageConf.secure_base_url + size + item.backdrop_path;
      });

      imageConf.poster_sizes.forEach(size => {
        item.poster_urls[size] = imageConf.secure_base_url + size + item.poster_path;
      });
    }

    return mediaItems;
  };

})();
