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
  if (course_code_input == "") course_code_input = "%";
  if (course_subject_input == "") course_subject_input = "%";
  var query =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department LIKE '%' || '" +
    course_subject_input +
    "' || '%' AND (CAST(public.class_info.course_subject AS varchar(5)) LIKE '%' || '" +
    course_code_input +
    "' || '%');";

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
