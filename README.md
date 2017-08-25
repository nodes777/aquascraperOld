## Aquascraper

Aquascraper scrapes the results of the closed auctions from aquabid.com. It then renders the sold results as a webpage.

## Installation
Requires:
[Phantom.js](http://phantomjs.org/)
[Casperjs](http://casperjs.org/)

## Instructions
###To Scrape:
In a terminal run
`casperjs scrape.js`

That writes js files with an array of all data for all fish categories.
/data/sold - an array of objects for all sold auction items in that category
/data/json - an array of objects for all closed auctions in that category
/dara/arr - an array of strings for all closed auctions in that category

tableToJSON turns those js arrays into JSON

###To Serve Webpage: