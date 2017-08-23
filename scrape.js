/* Casperjs Script */
var fs = require("fs");
var utils = require('utils'); // native module, for debuggin
var fishArray = JSON.parse( fs.read("./input/fishArray.js") );

/* Utility Functions */
var tableToJSON = require('./utils/tableToJSON');
var grab = require('./utils/grabTable');
var sold = require('./utils/getSoldItems');

var casper = require('casper').create({
  //verbose: true,
  //logLevel: 'debug',
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
         $('select[name="DAYS"]').val('30').change();
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
      // Write the data as array
      fs.write(pathToFolder+arrPath+fish+".js", JSON.stringify(tableData, null, 4), 'w')
      // write json of all closed auctions
      fs.write(pathToFolder+jsonPath+fish+outputFormat, JSON.stringify(formattedJSON, null, 4), 'w')
      // write json sold items only
      fs.write(pathToFolder+soldPath+fish+outputFormat, JSON.stringify(soldJSON, null, 4), 'w')
      console.log("Data written: "+fish);
    })
  })
})

casper.run(terminate);

/* Function Definitions*/
function terminate (){
  this.echo("Exiting...").exit();
};
