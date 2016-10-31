'use strict';

const express = require('express');
const router = express.Router(); //handles the routing of incoming requests
const pg = require('pg'); //Non-blocking PostgreSQL client for node.js.
const app = express();


/*DB Setup*/
// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
  user: 'dzqbfcki', //env var: PGUSER
  database: 'dzqbfcki', //env var: PGDATABASE
  password: 'XiSZ2IQTlRh0o01OBdJ2LGs9XKB0oeAR', //env var: PGPASSWORD
  host: 'elmer-02.db.elephantsql.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 5, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new pg.Pool(config);
/* End DB Setup */

app.set('port', process.env.PORT || 3000);

//blocks header from containing server info
app.disable('x-powered-by');
//set "main" as default layout, with handlebars as the engine
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
//set html as defined in "views" directory to be transported into "main.handlebars" layout
app.set('view engine', 'handlebars');

//When the user submits the URL, it hits this app.use and deciphers it here. Make sure routes are below this.
app.use(require('body-parser').urlencoded({
  extended: true
}));

//use this to import images/etc
app.use(express.static(__dirname + '/public'));


//Handle Routes

//Create 
router.post('/createShorter', (req, res, next) => {
  const results = [];
  console.log("welcome to post route, your request: " + req.body.url);
  //grab data from http-request
  const data = { text: req.body.url };

  //give error if there is no text in the request
  if (!data.text) {
    return res.status(400).json({ success: false, message: 'missing url' });
  }
  // connect to our database
  pool.connect((err, client, done) => {
    if (err) {
      done();
      return res.status(500).json({ success: false, message: err });
    }

    //SQL Query -> Insert Data
    client.query('INSERT INTO items(original_url) values($1)', [data.text], (err, result) => {
      done();
      console.log("you inserted some data!");
      if (err) {
        //Handle insertion error
        return res.status(500).render('home', { success: false });
      } else {
        //'results' table successfully recieved the query
        return res.status(200).render('home', { success: true });
      }
    });
  });
});

//enable the router, the hit route will send through here.
app.use('/', router);

//always last so you can make sure everything else is loaded before accepting connections.
app.listen(app.get('port'), function () {
  console.log("Express started on http://localhost:" + app.get('port'));
});
