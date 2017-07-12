var cheerio = require("cheerio");
var request = require("request-promise");
var fishPaths = require('./fishCategoryPaths');
var fs = require("fs");

/* Options */
var outputFormat = ".txt" // or html
var pathToFolder = "./aquatabletext"+outputFormat;
var fishType = fishPaths.characins;
var rootPath = 'http://www.aquabid.com/cgi-bin/auction/auction.cgi?';

var webUri = rootPath+fishType;
console.log(webUri);

var options = {
    uri: webUri,
    transform: function (body) {
        return cheerio.load(body);
    }
};

request(options)
	.then(function($){
		console.log("Connected!");
		getTdElems($);
	})
	.then(function(tdElems){
		writeFile(tdElems)
	})
	.catch(function(err){
		throw err;
	});


/* Write File */
function writeFile(tdElems){
	fs.writeFile(pathToFolder, tdElems, function(err) {
		if(err) {
			console.log("Couldn't write file!")
		    return console.log(err);
		}
		console.log("The file was saved!");
	});
}

function getTdElems($){
		var tdElems = $('td[width="7%"] font').text();
		console.log(tdElems);
		return tdElems;
}