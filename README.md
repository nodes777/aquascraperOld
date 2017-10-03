# Aquascraper

Aquascraper scrapes the results of the closed auctions from aquabid.com. It then sends that data to Firebase to be rendered.

## Installation
Requires:
* [Phantom.js](http://phantomjs.org/)
* [Casperjs](http://casperjs.org/)
* Include Phantom and Casper [in your PATH](https://stackoverflow.com/questions/14894311/installing-casperjs-on-windows-how-to-do-it-correctly)
* To send the data to Firebase, you'll need to replace the deets in deets.js with your own secret code and place that in [your environmental variables](https://kb.wisc.edu/cae/page.php?id=24500). Otherwise you can write the data to disk, with the commented out code in scrape.js. If you're on Heroku, you'll also need to set up an [environmental variable](https://devcenter.heroku.com/articles/config-vars)


## Instructions
###To Scrape:
In a terminal run
`casperjs scrape.js`

Data is currently written to Firebase, code to write to disk is commented out.

###To Grab the Data from Firebase
TODO