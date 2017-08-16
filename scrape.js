var fs = require("fs");
var utils = require('utils');
var fishArray = JSON.parse( fs.read("./fishArray.js") );
var tableToJSON = require('./tableToJSON');
var casper = require('casper').create({
  //verbose: true,
  //logLevel: 'debug',
  clientScripts: ["jquery.min.js"],
    pageSettings: {
        loadImages:  false,
        loadPlugins: false,
    },
});

var url = "http://www.aquabid.com/cgi-bin/auction/closed.cgi";

var outputFormat = ".js" // js, txt, html
var pathToFolder = "./data/";
var terminate = function(){
  this.echo("Exiting...").exit();
};


casper.start(url);
casper.waitForSelector('select[name="category"]').then(function(){
  casper.each(fishArray, function(self, fish){

    //evaluate is not async
    // .then is STEP Async, they're executed one after the other
    casper.then(function(){
     casper.evaluate(function(fish) {
          $('select[name="category"]').val(fish).change();
          $('select[name="DAYS"]').val('30').change();
      },fish) 
    })
      casper.thenClick("input[value='Submit']")
      casper.waitForSelector(".bluebg", function(){
         /* this.capture("img/" + fish + ".png");
          this.echo("Captured: " + "img/" + fish + ".png");
          this.echo("~~~~~~~~~~~~~~~~~~~~~~~~");
          */
          var tableData = grabTable(this);
          utils.dump(tableData);
          console.log(tableData);
          var formattedJSON = tableToJSON.format(tableData);
          fs.write(pathToFolder+fish+outputFormat, tableData, 'w')
          console.log("Data written: "+fish);
      })
  })
})
casper.run(terminate);

function grabTable(page){
        var allClosedTable = page.evaluate(function(){
        // The fish table is the 4th table on the page
          var table = document.querySelectorAll('table')[3];
          var trs = table.querySelectorAll("tr");

          var trTextArray = Array.prototype.map.call(trs, function(t) { return t.innerText; });

          return trTextArray;
      })
      return allClosedTable;
}
