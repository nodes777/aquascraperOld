var cheerio = require("cheerio");
var request = require("request-promise");
var fishPaths = require('./fishCategoryPaths');
var fs = require("fs");

/* Options */
var outputFormat = ".txt" // or html
var pathToFolder = "./aquatabletext"+outputFormat;

var rootURL = 'http://www.aquabid.com/cgi-bin/auction/auction.cgi?';

/* Loop through all fish paths to get end of url strings */
function getURLsRecursive (path){
	for(key in path){
		if (typeof path[key] === "object" && path[key] !== undefined && path[key] !== null){
			getURLsRecursive (path[key])
		} else {
			//console.log("Key: " + key + " Path: " +path[key] + "\n");
			makeRequest(key, path[key]);
		}	
	}
}

getURLsRecursive(fishPaths);

function makeRequest(fishName,urlEnd){
	var options = {
	    uri: rootURL+urlEnd,
	    transform: function (body) {
	        return cheerio.load(body);
	    }
	};
	request(options)
		.then(function($){
			console.log("Connected!" + "\n");
			var elemString = getTdElems($);
			var numArray = parseTextToNums(elemString);
			var avg = getAvg(numArray);
			var date = new Date();
			console.log(`Avg price of ${fishName} ${avg} on ${date} \n`);

		})
		.catch(function(err){
			throw err;
		});
}

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
		var priceElems = $('td[width="7%"] font').text();
		return priceElems;
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
	//return the avg cut to 2 decimal places
	return avg.toFixed(2);
}


/* Seperated by then statements

request(options)
	.then(function($){
		console.log("Connected!");
		return getTdElems($);
	})
	.then(function(tdElems){
		//console.log(tdElems);
		return parseTextToNums(tdElems);
	}).then(function(numArray){
		console.log(numArray);
		getAvg(numArray)
	})
	.catch(function(err){
		throw err;
	});

*/