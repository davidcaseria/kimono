# Kimono
[![Build Status](https://secure.travis-ci.org/davidcaseria/kimono.png?branch=master)](http://travis-ci.org/davidcaseria/kimono)

More information about [Kimono](https://www.kimonolabs.com) can be found on the [API docs](https://www.kimonolabs.com/apidocs).


## Getting Started

Install the module with: `npm install kimono`

```js
var Kimono = require('kimono');
var kimono = new Kimono('api key'); // Use your API key
```

## Documentation

### Kimono(apikey)

Constructor of a new Kimono object.

- `apikey`: your private API key

#### Kimono.retrieve(id [, params], callback)

Returns an API object matching a specific API id.

- `id`: unique 8 character identifier for the API
- `params`: additional URL parameters to pass with the request
  - `kimlimit`: limits the number of result rows returned by the API call
  - `kimoffset`: offset results returned to begin from a row other than the first
  - `kimbypage`: collate the results by page instead of by collection
  - `kimwithurl`: includes the original URL each row of data was extracted from
  - `kimindex`: includes an extra unique, incrementing index property for every item in every collection
  - `kimhash`: includes an extra unique hash property on every row in the collection
  - `kimseries`: presents the data as a time series across historical results, rather than as a single snapshot in time
  - `kimstats`: includes API crawl statistics in your data
- `callback(err, res)`: if `err` is null then the API response is returned in `res`, otherwise an error occured

#### Kimono.list(callback)

Returns a list of all APIs for the specified user.

- `callback(err, res)`: if `err` is null then the API response is returned in `res`, otherwise an error occured

#### Kimono.set(id, property, value, callback)

Sets a property on the API to a new value.

- `id`: unique 8 character identifier for the API
- `property`: the API property to update
- `value`: the new value of the API property
- `callback(err, res)`: if `err` is null then the API response is returned in `res`, otherwise an error occured

#### Kimono.setTargetUrl(id, value, callback)
> Alias for Kimono.set(id, 'targeturl', value, callback)

Set the target url for the API.

- `id`: unique 8 character identifier for the API
- `value`: any url
- `callback(err, res)`: if `err` is null then the API response is returned in `res`, otherwise an error occured

#### Kimono.setFrequency(id, value, callback)
> Alias for Kimono.set(id, 'frequency', value, callback)

Set the update frequency for the API. Once specified, kimono will attempt to fetch data from the target URL at this interval.

- `id`: unique 8 character identifier for the API
- `value`: fifteenminutely, halfhourly, hourly, daily, weekly, or monthly
- `callback(err, res)`: if `err` is null then the API response is returned in `res`, otherwise an error occured

#### Kimono.setCrawlLimit(id, value, callback)
> Alias for Kimono.set(id, 'crawllimit', value, callback)

Set the maximum number of pages to visit during a pagination crawl.

- `id`: unique 8 character identifier for the API
- `value`: the maximum number of pages to visit
- `callback(err, res)`: if `err` is null then the API response is returned in `res`, otherwise an error occured

#### Kimono.setCrawlUrls(id, value, callback)
> Alias for Kimono.set(id, 'urls', value, callback)

Set the list of urls to visit during a targeted crawl.

- `id`: unique 8 character identifier for the API
- `value`: an array containing all urls to be crawled
- `callback(err, res)`: if `err` is null then the API response is returned in `res`, otherwise an error occured

#### Kimono.startCrawl(id, callback)

Start the crawl process.

- `id`: unique 8 character identifier for the API
- `callback(err, res)`: if `err` is null then the API response is returned in `res`, otherwise an error occured

## Examples

```js
var Kimono = require('kimono');

var apikey = 'abc123';
var kimono = new Kimono(apikey);

kimono.retrieve('def456', {
  kimlimit: 50
}, function (err, res) {});
```


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2015 David Caseria  
Licensed under the MIT license.
