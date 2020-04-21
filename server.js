/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require("express"); //Ensure our express framework has been added
var app = express();
var bodyParser = require("body-parser"); //Ensure our body-parser tool has been added
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require("pg-promise")();
const dbConfig = process.env.DATABASE_URL;
var db = pgp(dbConfig);

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/")); //This line is necessary for us to use relative paths and access our resources directory

app.get("/", function (req, res) {
  res.render("pages/schedule", {});
});

app.get("/search", function (req, res) {
  res.render("pages/search", {
    data: "",
  });
});

app.get("/search/class_display", function (req, res) {
  var course_code_input = req.query.class_id;
  var course_subject_input = req.query.class_prefix;
  var query =
    "SELECT Class_info.Course_department, Class_info.Course_subject, Class_info.Course_start, Class_info.Course_end, Class_info.Course_instructor, Class_info.Course_days, Course_info.Course_name FROM Class_info FULL OUTER JOIN Course_info  ON Class_info.Course_department = Course_info.Course_department AND Class_info.Course_subject = Course_info.Course_subject WHERE Class_info.Course_department LIKE '%' ||" +
    course_code_input +
    "|| '%' AND(CAST(Class_info.Course_subject AS VARCHAR(5)) LIKE '%' ||" +
    course_subject_input +
    "|| '%');";

  db.any(query)
    .then(function (rows) {
      res.render("pages/search", {
        data: rows,
      });
    })
    .catch(function (err) {
      console.log("error", err);
      res.render("pages/search", {
        data: "",
      });
    });
});

app.get("/schedule", function (req, res) {
  res.render("pages/schedule", {});
});

app.get("/about", function (req, res) {
  res.render("pages/about", {});
});

app.listen(process.env.PORT);
