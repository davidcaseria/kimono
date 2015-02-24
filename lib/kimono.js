/*
 *
 * https://www.kimonolabs.com/
 *
 * Copyright (c) 2015 David Caseria
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');

var handleRequest = function (callback) {
  return function (err, res, body) {
    if (err) {
      return callback(err);
    } else if (res.statusCode !== 200) {
      err = new Error('HTTP ' + res.statusCode + ' Code');
      err.statusCode = res.statusCode;
      err.body = body;
      return callback(err);
    }

    callback(null, body);
  };
};

function Kimono(apikey) {
  this.apikey = apikey;
}

Kimono.prototype.retrieve = function () {
  var id;
  var params = {};
  var ondemand = false;
  var callback;

  if (arguments.length < 2 || arguments.length > 4) {
    throw Error('invalid arguments length');
  } else if (arguments.length === 2) {
    id = arguments[0];
    callback = arguments[1];
  } else if (arguments.length === 3) {
    id = arguments[0];
    if(typeof arguments[1] === 'boolean') {
      ondemand = arguments[1];
    } else {
      params = arguments[1];
    }
    callback = arguments[2];
  } else {
    id = arguments[0];
    params = arguments[1];
    ondemand = arguments[2];
    callback = arguments[3];
  }
  params.apikey = this.apikey;

  var url = 'https://www.kimonolabs.com/api/' + (ondemand ? 'ondemand/' : '');
  request(url + id, {
    json: true,
    qs: params
  }, handleRequest(callback));
};

Kimono.prototype.list = function () {
  var params = {};
  var callback;

  if (arguments.length !== 1) {
    throw Error('invalid arguments length');
  }
  callback = arguments[0];
  params.apikey = this.apikey;

  request('https://www.kimonolabs.com/kimonoapis', {
    json: true,
    qs: params
  }, handleRequest(callback));
};

Kimono.prototype.set = function () {
  var id;
  var params = {};
  var callback;

  if (arguments.length !== 4) {
    throw Error('invalid arguments length');
  }
  id = arguments[0];
  params.apikey = this.apikey;
  params[arguments[1]] = arguments[2];
  callback = arguments[3];

  request.post('https://www.kimonolabs.com/kimonoapis/' + id + '/update', {
    json: params
  }, handleRequest(callback));
};

Kimono.prototype.setTargetUrl = function () {
  if (arguments.length !== 3) {
    throw Error('invalid arguments length');
  }
  this.set(arguments[0], 'targeturl', arguments[1], arguments[2]);
};

Kimono.prototype.setFrequency = function () {
  if (arguments.length !== 3) {
    throw Error('invalid arguments length');
  }

  this.set(arguments[0], 'frequency', arguments[1], arguments[2]);
};

Kimono.prototype.setCrawlLimit = function () {
  if (arguments.length !== 3) {
    throw Error('invalid arguments length');
  }
  this.set(arguments[0], 'crawllimit', arguments[1], arguments[2]);
};

Kimono.prototype.setCrawlUrls = function () {
  if (arguments.length !== 3) {
    throw Error('invalid arguments length');
  }
  this.set(arguments[0], 'urls', arguments[1], arguments[2]);
};

Kimono.prototype.startCrawl = function () {
  var id;
  var callback;

  if (arguments.length !== 2) {
    throw Error('invalid arguments length');
  }
  id = arguments[0];
  callback = arguments[1];

  request.post('https://www.kimonolabs.com/kimonoapis/' + id + '/update', {
    json: {
      apikey: this.apikey
    }
  }, handleRequest(callback));
};

module.exports = Kimono;