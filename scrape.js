var fs = require("fs");
var utils = require('utils'); // native module, for debuggin
var fishArray = JSON.parse( fs.read("./input/fishArray.js") );
var tableToJSON = require('./utils/tableToJSON');
var grab = require('./utils/grabTable');
var page = require('./utils/page');

var casper = require('casper').create({
  //verbose: true,
  //logLevel: 'debug',
  clientScripts: ["./utils/jquery.min.js"],
    pageSettings: {
        loadImages:  false,
        loadPlugins: false,
    },
});

/* Data */
var url = "http://www.aquabid.com/cgi-bin/auction/closed.cgi";
var outputFormat = ".json" // js, txt, html, json
var pathToFolder = "./data/";


casper.start(url);
casper.waitForSelector('select[name="category"]').then(function(){
  casper.each(fishArray, function(self, fish){

    //evaluate is not async
    // .then is STEP Async, they're executed one after the other
    casper.then(function(){
     casper.evaluate(function(fish) {
        page.changeDropDowns(fish);
      },fish) 
    });
    casper.thenClick("input[value='Submit']");
    casper.waitForSelector(".bluebg", function(){
      // Get the data
      var tableData = grab.grabTable(this);
      //utils.dump(tableData);
      //console.log(tableData);
      // Format the data
      var formattedJSON = tableToJSON.format(tableData);
      // Write the data
      fs.write(pathToFolder+fish+outputFormat, JSON.stringify(tableData, null, 4), 'w')
      fs.write(pathToFolder+fish+"JSON"+outputFormat, JSON.stringify(formattedJSON, null, 4), 'w')
      console.log("Data written: "+fish);
    })
  })
})

casper.run(terminate);

/* Function Definitions*/
function terminate (){
  this.echo("Exiting...").exit();
};
