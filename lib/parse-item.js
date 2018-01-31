(() => {
  'use strict';

  const isObject = require('is-plain-object');

  /**
   * Parse a MediaItem.
   * 
   * @param {MediaItem} mediaItem
   * @param {Object} configuration 
   * @return {MediaItem}
   */
  module.exports = (mediaItem, configuration) => {
    let error;

    if (!mediaItem) error = '`mediaItem` must be provided.';
    if (!isObject(mediaItem)) error = '`mediaItem` must be an object.';
    if (!configuration) error = '`configuration` must be provided.';
    if (!isObject(configuration)) error = '`configuration` must be an object.';
    if (!configuration.images) error = '`configuration.images` must be provided.';

    mediaItem.backdrop_urls  = {};
    mediaItem.poster_urls    = {};

    configuration.images.backdrop_sizes.forEach(size => {
      mediaItem.backdrop_urls[size] = configuration.images.secure_base_url + size + mediaItem.backdrop_path;
    });

    configuration.images.poster_sizes.forEach(size => {
      mediaItem.poster_urls[size] = configuration.images.secure_base_url + size + mediaItem.poster_path;
    });

    return mediaItem;
  };

})();
