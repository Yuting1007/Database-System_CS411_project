var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// Function that gets connection to SQL database
function getConnection() {
  return mysql.createConnection({
    // host: 'us-cdbr-east-06.cleardb.net',
    // user: 'ba0144eebe0617',
    // password: '45188a1d', 
    // database: 'heroku_195486945502404'
    ////////
    // LOCAL HOST INFORMATION BELOW
    host: 'localhost',
    user: 'root',
    password: 'password', // PUT your own password here whatever it is locally
    database: '411project',
    // port: 3307
    port: 3306
    //insecureAuth : true
    })
}

/* GET home page. (this is for the express page, idk if we need this) */
router.get('/', function(req, res, next) {
  console.log("at home page!");
  res.render('index', { title: 'Expresssssssss' });
});

// router.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
//   });

// router.get("/users", (req, res) => {
//   const queryString = "SELECT * FROM students";
//   connection.query(queryString, (err, rows, fields) => {
//     if (err) {
//       console.log("Failed to query for users: " + err);
//       res.sendStatus(500);
//       //res.end();
//       return;
//     }

//     console.log("I think we fetched users successfully")
//     console.log(rows)
//     res.json(rows)
//   })
// })

// ////
// // GET request that takes a user's id a returns specifics
// ////
// router.get('/user/:id', (req, res) => {
//   console.log("Fetching user with id: " + req.params.id)


//   const userId = req.params.id;
//   const queryString = "SELECT * FROM students WHERE s_id = ?";
//   connection.query(queryString, [userId], (err, rows, fields) => {
//     if (err) {
//       console.log("Failed to query for users: " + err);
//       res.sendStatus(500);
//       //res.end();
//       return;
//     }

//     console.log("I think we fetched users successfully")
//     console.log(rows)
//     res.json(rows)
//   })

//   //res.end()
// })

module.exports = router;
