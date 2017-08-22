const express = require('express')  
const app = express();
const fs = require('fs');
/* require all the json files */
var requireGlob = require('require-glob');
 
var modules = requireGlob.sync('./data/*JSON.json')

const port = 3000
console.log(modules.fwanabantoidJSON);
app.get('/', (request, response) => {  
	
  response.send(fishJSON[0])
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})