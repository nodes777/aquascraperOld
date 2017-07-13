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
//console.log(webUri);

var options = {
    uri: webUri,
    transform: function (body) {
        return cheerio.load(body);
    }
};

request(options)
	.then(function($){
		console.log("Connected!");
		return getTdElems($);
	})
	.then(function(tdElems){
		//console.log(tdElems);
		//writeFile(tdElems)
		return parseTextToNums(tdElems);
	}).then(function(numArray){
		getAvg(numArray)
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

/* Get td elements from webpage */
function getTdElems($){
		var tdElems = $('td[width="7%"] font').text();
		//console.log(tdElems);
		return tdElems;
}

/* Parsing */
function parseTextToNums(string){
	// trim the extra space, then split by spaces
	var stringArr = string.trim().split(" ");
	// convert the string array to number array by mapping each item to Number func, parseInt would be an alternative
	var numArray = stringArr.map(Number);
	//console.log(numArray);
	//console.log(numArray.length);
	return numArray;
}

/* Get average of an array */ 
function getAvg(numArray) {
	var sum = numArray.reduce(function(accumulator, item){
		return accumulator + item;
	});
	var avg = sum / numArray.length;
	
	console.log(avg);
	//return the avg cut to 2 decimal places
	return avg.toFixed(2);
}