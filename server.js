const express = require('express') 
const app = express();
const fs = require('fs');
const requireGlob = require('require-glob');
/* require all the SOLD json files */
const fishTypes = requireGlob.sync('./data/*SOLD.json')

const port = 3000

const handlebars = require('express-handlebars').create({defaultLayout:'main'});
 
app.engine('handlebars', handlebars.engine);
 
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {  
  response.render('home', fishTypes)
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})