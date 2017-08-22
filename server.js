const express = require('express') 
const app = express();
const fs = require('fs');
const requireGlob = require('require-glob');
/* require all the SOLD json files */
const fishType = requireGlob.sync('./data/*SOLD.json')

const port = 3000

app.get('/', (request, response) => {  
  response.send(fishType.fwanabantoidSOLD)
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})