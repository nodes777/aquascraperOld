var fishPaths = require('./fishCategoryPaths');
var fs = require("fs");

/* Options */
var outputFormat = ".js"
var pathToFolder = "./fishArray"+outputFormat;

var arr = [];
/* Loop through all fish paths to get end of url strings */
function getURLsRecursive (path){
	for(key in path){
		if (typeof path[key] === "object" && path[key] !== undefined && path[key] !== null){
			getURLsRecursive (path[key])
		} else {
			//console.log("Key: " + key + " Path: " +path[key] + "\n");
			arr.push(path[key]);
		}	
	}
}
getURLsRecursive(fishPaths);


fs.writeFile(pathToFolder, arr, function(err) {
		if(err) {
			console.log("Couldn't write file!")
		    return console.log(err);
		}
		console.log("The file was saved!");
	});