var _ = require('underscore');
var api_request = require('./api_request');

module.exports = function(app_id, app_secret) {
  return {
    app_fetch_content: function (args, success, failure) {
      var opts = _.extend({app_id: app_id, app_secret: app_secret}, args);
      opts.content_id = +opts.content_id;
      api_request('app_fetch_content', opts, function (apiRes) {
        success(JSON.stringify(apiRes));
      }, failure);
    },

    app_create_content: function (args, success, failure) {
      var opts = _.extend({app_id: app_id, app_secret: app_secret}, args);
      opts.created_by = +opts.created_by;
      api_request('app_create_content', opts, function (apiRes) {
        success(JSON.stringify(apiRes));
      }, failure);
    },

    app_update_content: function (args, success, failure) {
      var opts = _.extend({app_id: app_id, app_secret: app_secret}, args);
      opts.content_id = +opts.content_id;
      opts.created_by = +opts.created_by;
      api_request('app_update_content', opts, function (apiRes) {
        success(JSON.stringify(apiRes));
      }, failure);
    },

    app_destroy_content: function (args, success, failure) {
      var opts = _.extend({app_id: app_id, app_secret: app_secret}, args);
      opts.content_id = +opts.content_id;
      api_request('app_destroy_content', opts, function (apiRes) {
        success(JSON.stringify(apiRes));
      }, failure);
    },
  }
};
