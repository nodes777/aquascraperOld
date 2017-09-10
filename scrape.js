/* Casperjs Script */
var fs = require("fs");
var utils = require('utils'); // native module, for debuggin
var fishArray = JSON.parse( fs.read("./input/fishArray.js") );

/* Utility Functions */
var tableToJSON = require('./utils/tableToJSON');
var grab = require('./utils/grabTable');
var sold = require('./utils/getSoldItems');
var jQuery = require("./utils/jquery.min.js");
var deets = require('./deets');


var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug',
  clientScripts: ["./utils/jquery.min.js"],
    pageSettings: {
        loadImages:  false,
        loadPlugins: false,
    },
});

/* Consts */
var url = "http://www.aquabid.com/cgi-bin/auction/closed.cgi";
var outputFormat = ".json" // js, txt, html
var pathToFolder = "./data/";
var arrPath = "./array/";
var soldPath = "./sold/";
var jsonPath = "./json/";

/* For capturing console.logs() within the pages
      casper.on('remote.message', function(msg) {
        this.echo('remote message caught: ' + msg);
      })
      casper.on( 'page.error', function (msg, trace) {
        this.echo( 'Error: ' + msg, 'ERROR' );
      });
*/

/* Start the scraping */
casper.start(url);

casper.waitForSelector('select[name="category"]').then(function(){
  casper.each(fishArray, function(self, fish){
    // evaluate is not async
    // .then is STEP Async, they're executed one after the other
    casper.then(function(){
      // Change the drop down selections
     casper.evaluate(function(fish) {
         $('select[name="category"]').val(fish).change();
         $('select[name="DAYS"]').val('3').change();
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
      // Sort for only the sold items
      var soldJSON = sold.getSoldItems(formattedJSON);

      console.log("Attempting to send to Firebase...")

      casper.then(function(){
        // Open the url for the database
        casper.thenOpen("https://aquascraper-data.firebaseio.com/test/"+fish+".json?auth="+deets.deets+"&debug=true",{
          method: "post",
          data: JSON.stringify(soldJSON),
          headers: {
            auth : "xxxxxx",
            keepAlive : true
          },
          contentType : 'application/json',
          dataType: 'json',
        },function(response){
          casper.echo("POSTED: "+fish);
          //casper.echo(JSON.stringify(response));
        });
      });
    });
    casper.thenOpen(url);
  })
})

casper.run(terminate);

/* Function Definitions*/
function terminate (){
  this.echo("Exiting...").exit();
};


/* Writing to file
// Write the data as array
fs.write(pathToFolder+arrPath+fish+".js", JSON.stringify(tableData, null, 4), 'w')
// write json of all closed auctions
fs.write(pathToFolder+jsonPath+fish+outputFormat, JSON.stringify(formattedJSON, null, 4), 'w')
// write json sold items only
fs.write(pathToFolder+soldPath+fish+outputFormat, JSON.stringify(soldJSON, null, 4), 'w')
console.log("Data written: "+fish);
*/