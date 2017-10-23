var require = patchRequire(require);

exports.getDateInfo = function(){
	var dateInfo = {};

	var time = Date.now();
	var date = new Date(time);
	console.log("\nStarting scrape on: " + date);

	var dateArray = date.toString().split(" ");
	var dayOfWeek = dateArray[0];
	var dayScraped = dateArray.slice(2,3);
	dayScraped.push(dayOfWeek);
	dateInfo.dayScrapedUrl = dayScraped.join("-");

	var firebaseMonth = dateArray.slice(1,2);
	firebaseMonth += dateArray.slice(3,4);

	dateInfo.firebaseMonthPath = firebaseMonth.toString();

	console.log(dateInfo.firebaseMonthPath);


	return dateInfo;
};

