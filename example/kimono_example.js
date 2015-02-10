'use strict';

var Kimono = require('../lib/kimono.js');

var apikey = 'abc123';
var kimono = new Kimono(apikey);

kimono.retrieve('def456', {
  kimlimit: 50
}, function (err, res) {});