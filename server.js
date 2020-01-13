// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require("express");
var mysql = require("mysql");
var path = require("path");
var util = require("util");
var fs = require("fs");

// The built-in util package can be used to create Promise-based versions of functions using node style callbacks
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connects the style file as well as other neccessary js files
app.use(express.static("public"));

app.get('/', (req, res) => {
    // will serve home page
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get('/notes', (req, res) => {
    // will serve notes page
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

// retrieves all the data from the json file
app.get("/api/notes", function(req, res) {
    readFileAsync("db/db.json", "utf8").then(function(data) {
        // Parse the JSON string to an object
        const noteData = JSON.parse(data);
        return res.json(noteData)
    });
});


app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    readFileAsync("db/db.json", "utf8").then(function(data) {
        // Parse the JSON string to an object
        const noteData = JSON.parse(data);

    });

});








// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});