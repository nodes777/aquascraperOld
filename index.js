var cheerio = require("cheerio");
var request = require("request-promise");
var fishPaths = require('./fishCategoryPaths');
var fs = require("fs");

/* Options */
var outputFormat = ".txt" // or html
var pathToFolder = "./aquatabletext"+outputFormat;
var fishType = fishPaths.nonBettas;
var rootPath = 'http://www.aquabid.com/cgi-bin/auction/auction.cgi?';

var options = {
    uri: rootPath+fishType,
    transform: function (body) {
        return cheerio.load(body);
    }
};

request(options)
	.then(function($){
		console.log("Connected!");
		var tdElems = $('td[width="7%"] font').text();
		console.log(tdElems);
		writeFile(tdElems);
		//parseTdElems($, tdElems);
	})
	.catch(function(err){
		throw err;
	});

function parseTdElems($, tdElems){
	console.log(tdElems);
	var data = [];
	/*tdString.each(function(i, insides){
		console.log(insides.children);
    });*/
}

function writeFile(tdElems){
	fs.writeFile(pathToFolder, tdElems, function(err) {
		if(err) {
		    return console.log(err);
		}
		console.log("The file was saved!");
	});
}