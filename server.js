const express = require('express')  
const app = express();
const fs = require('fs');
/* require all the json files */
var requireDir = require('require-dir');
var dir = requireDir('./data');
console.log(dir);
console.log(dir.fwanabantoidJSON2[0]);

const fishJSON =  require("./data/fwanabantoidJSON2.json");  
const port = 3000
console.log(fishJSON[0]);
app.get('/', (request, response) => {  
	
  response.send(fishJSON[0])
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})