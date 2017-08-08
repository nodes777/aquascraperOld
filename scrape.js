var fs = require("fs");
var casper = require('casper').create({
  clientScripts: ["jquery.min.js"],
    pageSettings: {
        loadImages:  false,
        loadPlugins: false,
    },
});
var url = "http://www.aquabid.com/cgi-bin/auction/closed.cgi";

var outputFormat = ".html" // js, txt, html
var pathToFolder = "./scrapetext"+outputFormat;
var terminate = function(){
  this.echo("Exiting...").exit();
};


var processPage = function(){
  this.echo('Title: ' + this.getTitle());
  /*
  var x = this.evaluate(function(){
   return $('select[size="1"]').text();
  })
  console.log(x);
  */
  this.evaluate(function() {
      $('select[name="category"]').val('fwarowana').change();
      $('select[name="DAYS"]').val('30').change();
  })
  this.capture('screenshot.png');
  console.log("Captured screenshot 1");
  this.thenClick("input[value='Submit']");
  this.waitForSelector(".bluebg", function(){
      this.capture('screenshot2.png');
      console.log("Captured screenshot 2");
  });
  /*
  .thenClick("input[name='B1']")
  .then(function(){
    this.echo('Title: ' + this.getTitle());
  });
  */
};


casper.start(url)
   
casper.waitForSelector("input[value='View Closed Items']", processPage, terminate);

casper.run();

