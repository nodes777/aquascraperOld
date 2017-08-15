var fs = require("fs");
var fishArray = JSON.parse( fs.read("./fishArray.js") );
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

var outputFormat = ".html" // js, txt, html
var pathToFolder = "./data/";
var terminate = function(){
  this.echo("Exiting...").exit();
};

/*
var processPage = function(fishArray){
  //1st Page with closed auction options
  //var fishName = 'fwarowana'
  //var fishName = fishArray;
  casper.echo('Title: ' + casper.getTitle());

  casper.evaluate(function() {
      $('select[name="category"]').val(fishName).change();
      $('select[name="DAYS"]').val('30').change();
  })
  console.log("Changed dropdowns");
  casper.capture('screenshot'+fishName+'.png');

  console.log("Captured screenshot 1");
  casper.thenClick("input[value='Submit']");

  //2nd Page with actual closed auction results
  casper.waitForSelector(".bluebg", function(){
      console.log("On "+ fishName + " page \n")
      casper.capture('screenshot2'+fishName+'.png');
      console.log("Captured screenshot 2");

      var tableData = grabTable(this);

      fs.write(pathToFolder+fishName+outputFormat, tableData, 'w');
  })
};

*/

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
          fs.write(pathToFolder+fish+outputFormat, tableData, 'w')
          console.log("Data written: "+fish);
      })

  })

})
casper.run(terminate);



/*
casper.start().each(fishArray, function(self, fish) {
    self.thenOpen(url, function() {
      this.echo('Starting: ' + fish, 'INFO');

      casper.waitForSelector('select[name="category"]');
      // this evalaute isnt changing the dropdowns
      casper.evaluate(function() {
          $('select[name="category"]').val(fish).change();
          $('select[name="DAYS"]').val('30').change();
      });

      casper.capture("img/screen.png");

      casper.thenClick("input[value='Submit']");
    });
});

casper.run(terminate);
*/

/*
casper.waitForSelector(".bluebg", function(){
          this.capture("img/" + fish + ".png");
          this.echo("Captured: " + "img/" + fish + ".png");
          this.echo("~~~~~~~~~~~~~~~~~~~~~~~~");

          var tableData = grabTable(this);
          //fs.write(pathToFolder+fish+outputFormat, tableData, 'w')
          //console.log("Data written: "+fish);
      })
*/

/*

        this.echo("Started loading: " + fishArray[i]);
        this.wait(1000, function() {
            this.capture("img/" + fishArray[i] + ".png");
            this.echo("Captured: " + "img/" + fishArray[i] + ".png");
            this.echo("~~~~~~~~~~~~~~~~~~~~~~~~");

casper.start(url)

casper.waitForSelector("input[value='View Closed Items']", function(){ return processPage(fishArray)});

casper.run(terminate);
*/
/*
getURLsRecursive(fishArray);
function getURLsRecursive (fishJSON){
  for(fishURL in fishJSON){
    if (typeof fishJSON[fishURL] === "object" && fishJSON[fishURL] !== undefined && fishJSON[fishURL] !== null){
      getURLsRecursive(fishJSON[fishURL]);

    } else {
      (function(fish){
        casper.start(url)

        casper.waitForSelector("input[value='View Closed Items']", function(){ return processPage(fish)});

        casper.run(terminate);
      })(fishJSON[fishURL]);

    } 
  }
}
*/

function grabTable(page){
        var allClosedTable = page.evaluate(function(){
        // The fish table is the 4th table on the page
          var table = document.querySelectorAll('table')[3];
          var trs = table.querySelectorAll("tr");

          var trHtml = Array.prototype.map.call(trs, function(t) { return t.innerHTML; });

          return trHtml;
      })

        return allClosedTable;
}