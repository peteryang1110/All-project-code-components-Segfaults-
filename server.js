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
  // var classId = "";
  // if (req.query.class_id != "") classId = "course_subject" + req.query.class_id;
  // var classPrefix = "";
  // if (classId != "" && req.query.class_prefix != "")
  //   classPrefix = " && course_department = " + req.query.class_prefix;
  // else if (classId == "" && req.query.class_prefix != "")
  //   classPrefix = "course_department = " + req.query.class_prefix;
  // var professorName = "";
  // if ((classId != "" || classPrefix != "") && req.query.professor_name != "")
  //   professorName = " && course_instructor = " + professor_name;
  // else if (classId == "" && req.query.class_prefix == "")
  //   professorName = "course_instructor = " + professor_name;

  var query =
    "SELECT * FROM public.class_info WHERE course_subject = 1120 && course_department = ANTH";

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
