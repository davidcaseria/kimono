/*global before,describe,it*/
'use strict';
var expect = require('chai').expect;
var Kimono = require('../lib/kimono.js');
var nock = require('nock');
var kimono;

describe('Kimono', function () {
  before(function () {
    kimono = new Kimono('abc123');
  });

  describe('#constructor', function () {

    it('should accept an API key', function () {
      expect(kimono.apikey).to.equal('abc123');
    });

    it('should have function properties', function () {
      expect(kimono.retrieve).to.be.a('function');
      expect(kimono.list).to.be.a('function');
      expect(kimono.setTargetUrl).to.be.a('function');
      expect(kimono.setFrequency).to.be.a('function');
      expect(kimono.setFrequency).to.be.a('function');
      expect(kimono.setCrawlLimit).to.be.a('function');
      expect(kimono.setCrawlUrls).to.be.a('function');
      expect(kimono.startCrawl).to.be.a('function');
    });

  });

  describe('#retrieve', function () {

    before(function () {
      var res = {
        id: 'def456'
      };
      nock('https://www.kimonolabs.com')
        .get('/api/def456?apikey=abc123').reply(200, res)
        .get('/api/def456?kimlimit=1000&apikey=abc123').reply(200, res)
        .get('/api/ondemand/def456?apikey=abc123').reply(200, res);
    });

    it('should retrieve a specified API', function (done) {
      kimono.retrieve('def456', function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.id).to.equal('def456');
        done();
      });
    });

    it('should retrieve a specified API with URL parameters', function (done) {
      kimono.retrieve('def456', {
        kimlimit: 1000
      }, function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.id).to.equal('def456');
        done();
      });
    });

    it('should retrieve a specified API on demand', function (done) {
      kimono.retrieve('def456', true, function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.id).to.equal('def456');
        done();
      });
    });

  });

  describe('#list', function () {

    before(function () {
      var res = {
        count: 1
      };
      nock('https://www.kimonolabs.com')
        .get('/kimonoapis?apikey=abc123').reply(200, res);
    });

    it('should list all APIs', function (done) {
      kimono.list(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.count).to.equal(1);
        done();
      });
    });

  });

  describe('#setTargetUrl', function () {

    before(function () {
      var res = {
        id: 'def456'
      };
      nock('https://www.kimonolabs.com')
        .post('/kimonoapis/def456/update', {
          apikey: 'abc123',
          targeturl: 'ghi789'
        }).reply(200, res);
    });

    it('should update the API\'s target URL', function (done) {
      kimono.setTargetUrl('def456', 'ghi789', function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.id).to.equal('def456');
        done();
      });
    });

  });

  describe('#setFrequency', function () {

    before(function () {
      var res = {
        id: 'def456'
      };
      nock('https://www.kimonolabs.com')
        .post('/kimonoapis/def456/update', {
          apikey: 'abc123',
          frequency: 'ghi789'
        }).reply(200, res);
    });

    it('should update the API\'s frequency', function (done) {
      kimono.setFrequency('def456', 'ghi789', function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.id).to.equal('def456');
        done();
      });
    });

  });

  describe('#setCrawlLimit', function () {

    before(function () {
      var res = {
        id: 'def456'
      };
      nock('https://www.kimonolabs.com')
        .post('/kimonoapis/def456/update', {
          apikey: 'abc123',
          crawllimit: 'ghi789'
        }).reply(200, res);
    });

    it('should update the API\'s crawl limit', function (done) {
      kimono.setCrawlLimit('def456', 'ghi789', function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.id).to.equal('def456');
        done();
      });
    });

  });

  describe('#setCrawlUrls', function () {

    before(function () {
      var res = {
        id: 'def456'
      };
      nock('https://www.kimonolabs.com')
        .post('/kimonoapis/def456/update', {
          apikey: 'abc123',
          urls: ['ghi789']
        }).reply(200, res);
    });

    it('should update the API\'s crawl URLs', function (done) {
      kimono.setCrawlUrls('def456', ['ghi789'], function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.id).to.equal('def456');
        done();
      });
    });

  });

  describe('#startCrawl', function () {

    before(function () {
      var res = {
        id: 'def456'
      };
      nock('https://www.kimonolabs.com')
        .post('/kimonoapis/def456/update', {
          apikey: 'abc123'
        }).reply(200, res);
    });

    it('should update the API\'s crawl URLs', function (done) {
      kimono.startCrawl('def456', function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.id).to.equal('def456');
        done();
      });
    });

  });

});