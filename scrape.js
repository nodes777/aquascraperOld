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