## Aquascraper

Aquascraper scrapes the results of the closed auctiond from aquabid.com.

## Installation
Requires:
[Phantom.js](http://phantomjs.org/)
[Casperjs](http://casperjs.org/)

## Instructions
In a terminal run
`casperjs scrape.js`

That writes js files with an array of all data for all fish categories.

tableToJSON turns those js arrays into JSON