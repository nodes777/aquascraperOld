const express = require('express') 
const app = express();
const fs = require('fs');
const requireGlob = require('require-glob');
/* require all the SOLD json files */
const fishTypes = requireGlob.sync('./data/sold/*.json')
console.log(fishTypes.fwanabantoid);
const port = 3000

//const handlebars = require('express-handlebars').create({defaultLayout:'main'});

//app.engine('handlebars', handlebars.engine);
var exphbs = require('express-handlebars'); 
app.engine('handlebars', exphbs({	helpers: { json: function (context) { return JSON.stringify(context); } } }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => { 
  response.render('home', { fishTypes: fishTypes });
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})