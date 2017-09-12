## Aquascraper

Aquascraper scrapes the results of the closed auctions from aquabid.com. It then sends that data to Firebase to be rendered.

## Installation
Requires:
[Phantom.js](http://phantomjs.org/)
[Casperjs](http://casperjs.org/)

Include Phantom and Casper [in your PATH](https://stackoverflow.com/questions/14894311/installing-casperjs-on-windows-how-to-do-it-correctly)


## Instructions
###To Scrape:
In a terminal run
`casperjs scrape.js`

Data is currently written to Firebase, code to write to disk is commented out.

###To Grab the Data from Firebase