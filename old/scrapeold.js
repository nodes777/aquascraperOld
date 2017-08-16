var fs = require("fs");
var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,
        loadPlugins: false
    },
});
var url = "http://www.aquabid.com/cgi-bin/auction/closed.cgi";


var outputFormat = ".html" // or html
var pathToFolder = "./scrapetext"+outputFormat;

var terminate = function(){
  this.echo("Exiting...").exit();
};

var processPage = function(){
  this.echo('Title: ' + this.getTitle());
  this.thenClick("input[value='Submit']").then(function(){
      console.log("clicked closed items...")

  }).waitForSelector(".bluebg").then(function(){
    // Same as getTitle, but uses evaluate and supposed to turn the text green but isnt...
    this.echo('Page title is: ' + this.evaluate(function() {
        return document.title;
    }), 'INFO');


      var allClosedTable = this.evaluate(function(){
        // The fish table is the 4th table on the page
          var table = document.querySelectorAll('table')[3];
          var tableTextContent = table.textContent;
          var trs = table.querySelectorAll("tr");

          var y = Array.prototype.map.call(trs, function(t) { return t.innerHTML; });

          return y;
      })

      //console.log(typeof allClosedTable);
      //var check = allClosedTable.querySelector("td font[size='2']").textContent;
      this.echo('Getting table: ' + allClosedTable.length);
      fs.write(pathToFolder, allClosedTable, 'w');
      

  }).then(terminate);
};


casper.start(url)
   
casper.waitForSelector("input[value='View Closed Items']", processPage, terminate);

casper.run();



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

/*

var y = Array.prototype.map.call(table, function(t) { return t.textContent; });
JSON.stringify(check[0]))
      for (var index = 0; index < check.length; index++) {
    console.log(check[0][index]);
}
.textContent for text()
querySelector('td center b font')
b font[size="2"]
document.querySelector('#username')
casper.then(function() {
   // search for 'casperjs' from google form
   this.fill('form[action="/search"]', { q: 'casperjs' }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
    // now search for 'phantomjs' by filling the form again
    this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});
*/