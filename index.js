//Call express to be used in this app 
var express = require("express");
var app = express();

//Call PG to be used on this app
const { Pool } = require("pg");

// use Path
const path = require('path')

//type of files to be used
app.set('view engine', 'ejs')

//Call PG to conect to postgres and use dbs locally
// or un Heroku, highly useful 
/***********************************************
 *  This is a template for a local conection and how
 * to create a User on localhost PG
 * "postgres://USER:PASSWORD@localhost:5432/USER"
 * 
 * 

***********************************************/
const connectionString = process.env.DATABASE_URL || "postgres://isaac:student@localhost:5432/prove10";

// stablish connection to the data source with connectionString
const pool = new Pool({connectionString: connectionString}); // this is the global point of access


// Set your port locally or in Heroku
app.set("port", (process.env.PORT || 5000));

//Set folders in use
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))



//index redirection
app.get('/', function(req, res){res.render('pages/index'); })
app.get('/index', function(req, res){res.render('pages/index'); })

//app.get lets you set a "Route" to listen and respond
// to the users request (Makes an enpoint)
app.get("/getRestaurants", getRestaurants)


//set the listening to the server
app.listen(app.get("port"), function(){
    //console log to debug
console.log("Listening on port: ", app.get("port"));
});
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////// HERE YOU CAN MAKE MORE FUNCTIONS TO HANDLE REQUESTS//////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

function getRestaurants(req, res){
    console.log("At getRestaurants Function")

    //this takes the end of the URL request to
    // Truly query into a database, in this case, it will be saved
    // in an id variable to be used later
    
    //var p_id = req.query.p_id;


    //// !!!!!!!!!!!!!!!!!!!!!!!!!!
    /// !!!!! the request endpoint must match the column in the DATABASE!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log("Retriving restaurants ");

    // Use the getPersonFromDb function to get results from the DB
    restaurant( function(error, result){
        // if you dont get anything back from the DB then
        if (error || result == null || result.length <=0){
            // Display this error json string
            res.status(500).json({success:false, data: error});
        } else{
            //Else if the DB query worked, return the result
        console.log("The results from the Database are: ", result);


        //var obj = JSON.parse(result);
        ////// HERE IS THE ERROR!
        // I CANT MAKE IT PARSE! :(

        res.json(result);




        }
    });   


}

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////SUB FUNCTION OF getPerson //////////////// 
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
function restaurant( callback) {
     console.log("at restaurant function")

     //im not really sure here, but we first create a query and use $1 and pass it as an int like this
     // $1::int, My guess is that params in the first array position is [id], and it will be passed to 
     // the query in the pool.query to make the consult.
     var sql = "SELECT * FROM restaurants";
     //var params = [p_id];

     pool.query(sql, function(err,result){
         if (err){
             console.log("Error with the DB");
             console.log(err); 
             callback(err, null);
         }
         //console.log("Found DB result: " + JSON.stringify(result.rows));
         callback(null, result.rows);
     })

}
