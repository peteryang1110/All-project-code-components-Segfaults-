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
  res.render("pages/schedule", {
    data: "",
    number: "",
  });
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
  res.render("pages/schedule", {
    data: "",
    number: "",
  });
});

app.get("/schedule/scheduler", function (req, res) {
  var count = 0;

  var classInput_1 = new Array(2);
  classInput_1[0] = req.query.class_id_1 ? req.query.class_id_1 : "0";
  classInput_1[1] = req.query.class_prefix_1 ? req.query.class_prefix_1 : "0";
  if (classInput_1[0] != "0" && classInput_1[1] != "0") count++;
  var query1 =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department = '" +
    classInput_1[1] +
    "' AND public.class_info.course_subject = '" +
    classInput_1[0] +
    "';";

  var classInput_2 = new Array(2);
  classInput_2[0] = req.query.class_id_2 ? req.query.class_id_2 : "0";
  classInput_2[1] = req.query.class_prefix_2 ? req.query.class_prefix_2 : "0";
  if (classInput_2[0] != "0" && classInput_2[1] != "0") count++;
  var query2 =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department = '" +
    classInput_2[1] +
    "' AND public.class_info.course_subject = '" +
    classInput_2[0] +
    "';";

  var classInput_3 = new Array(2);
  classInput_3[0] = req.query.class_id_3 ? req.query.class_id_3 : "0";
  classInput_3[1] = req.query.class_prefix_3 ? req.query.class_prefix_3 : "0";
  if (classInput_3[0] != "0" && classInput_3[1] != "0") count++;
  var query3 =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department = '" +
    classInput_3[1] +
    "' AND public.class_info.course_subject = '" +
    classInput_3[0] +
    "';";

  var classInput_4 = new Array(2);
  classInput_4[0] = req.query.class_id_4 ? req.query.class_id_4 : "0";
  classInput_4[1] = req.query.class_prefix_4 ? req.query.class_prefix_4 : "0";
  if (classInput_4[0] != "0" && classInput_4[1] != "0") count++;
  var query4 =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department = '" +
    classInput_4[1] +
    "' AND public.class_info.course_subject = '" +
    classInput_4[0] +
    "';";

  var classInput_5 = new Array(2);
  classInput_5[0] = req.query.class_id_5 ? req.query.class_id_5 : "0";
  classInput_5[1] = req.query.class_prefix_5 ? req.query.class_prefix_5 : "0";
  if (classInput_5[0] != "0" && classInput_5[1] != "0") count++;
  var query5 =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department = '" +
    classInput_5[1] +
    "' AND public.class_info.course_subject = '" +
    classInput_5[0] +
    "';";

  var classInput_6 = new Array(2);
  classInput_6[0] = req.query.class_id_6 ? req.query.class_id_6 : "0";
  classInput_6[1] = req.query.class_prefix_6 ? req.query.class_prefix_6 : "0";
  if (classInput_6[0] != "0" && classInput_6[1] != "0") count++;
  var query6 =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department = '" +
    classInput_6[1] +
    "' AND public.class_info.course_subject = '" +
    classInput_6[0] +
    "';";

  var classInput_7 = new Array(2);
  classInput_7[0] = req.query.class_id_7 ? req.query.class_id_7 : "0";
  classInput_7[1] = req.query.class_prefix_7 ? req.query.class_prefix_7 : "0";
  if (classInput_7[0] != "0" && classInput_7[1] != "0") count++;
  var query7 =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department = '" +
    classInput_7[1] +
    "' AND public.class_info.course_subject = '" +
    classInput_7[0] +
    "';";

  var classInput_8 = new Array(2);
  classInput_8[0] = req.query.class_id_8 ? req.query.class_id_8 : "0";
  classInput_8[1] = req.query.class_prefix_8 ? req.query.class_prefix_8 : "0";
  if (classInput_8[0] != "0" && classInput_8[1] != "0") count++;
  var query8 =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department = '" +
    classInput_8[1] +
    "' AND public.class_info.course_subject = '" +
    classInput_8[0] +
    "';";

  var classInput_9 = new Array(2);
  classInput_9[0] = req.query.class_id_9 ? req.query.class_id_9 : "0";
  classInput_9[1] = req.query.class_prefix_9 ? req.query.class_prefix_9 : "0";
  if (classInput_9[0] != "0" && classInput_9[1] != "0") count++;
  var query9 =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department = '" +
    classInput_9[1] +
    "' AND public.class_info.course_subject = '" +
    classInput_9[0] +
    "';";

  var classInput_10 = new Array(2);
  classInput_10[0] = req.query.class_id_10 ? req.query.class_id_10 : "0";
  classInput_10[1] = req.query.class_prefix_10
    ? req.query.class_prefix_10
    : "0";
  if (classInput_10[0] != "0" && classInput_10[1] != "0") count++;
  var query10 =
    "SELECT * FROM public.class_info WHERE public.class_info.course_department = '" +
    classInput_10[1] +
    "' AND public.class_info.course_subject = '" +
    classInput_10[0] +
    "';";

  db.task("get-everything", (task) => {
    return task.batch([
      task.any(query1),
      task.any(query2),
      task.any(query3),
      task.any(query4),
      task.any(query5),
      task.any(query6),
      task.any(query7),
      task.any(query8),
      task.any(query9),
      task.any(query10),
    ]);
  })
    .then((info) => {
      res.render("pages/schedule", {
        data: info,
        number: count,
      });
    })
    .catch((err) => {
      console.log("error", err);
      response.render("pages/schedule", {
        data: "",
        number: "",
      });
    });
});

app.get("/about", function (req, res) {
  res.render("pages/about", {});
});

app.listen(process.env.PORT);
