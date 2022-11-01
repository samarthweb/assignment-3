
var express = require('express');
var value = require('./data-service.js');
var connect = require('path');
var assignment = express();
var bodyParser = require('body-parser');
const multer = require("multer");
const file_system = require('fs');

assignment.use(express.urlencoded({extended: true}));

assignment.use(bodyParser.urlencoded({ extended: true }));

var HTTP_PORT = process.env.PORT || 8080;

function onHTTPStart() {console.log('server listening on: ' + HTTP_PORT);}

const storage = multer.diskStorage({destination: "./public/images/uploaded",
filename: function (req, file, cb) {cb(null, Date.now() + connect.extname(file.originalname));}});

const upload = multer({ storage: storage });
  
assignment.use(express.static('public'));

assignment.get('/', function(req, res) {res.sendFile(connect.join(__dirname, '/views/home.html'));});

assignment.get('/about', function(req, res) {res.sendFile(connect.join(__dirname, '/views/about.html'));});

assignment.get('/managers', function(req, res) {value.getManagers().then((value) => {res.json(value);});});

assignment.get('/departments', function(req, res) {value.getDepartments().then((value) => {res.json(value);});});

assignment.get('/employees/add', function(req, res) {res.sendFile(connect.join(__dirname, '/views/addEmployee.html'));});

assignment.get('/images/add', function(req, res) {res.sendFile(connect.join(__dirname, '/views/addImage.html'));});

assignment.post("/images/add", upload.single("imageFile"), (req, res) => {res.redirect("/images");});

assignment.get('/employees', function(req, res) {

  if(req.query.department){value.getEmployeesByDepartment(req.query.department).then((value) => {res.json(value);});} 
  
  else if(req.query.status){value.getEmployeesByStatus(req.query.status).then((value) => {res.json(value);});} 

  else if(req.query.manager){value.getEmployeesByManager(req.query.manager).then((value) => {res.json(value);});} 
  
  else if(req.query.employeeNum){ value.getEmployeeByNum(req.query.employeeNum).then((value) => {res.json(value);});}
  
  else{ value.getAllEmployees().then((value) => {res.json(value);});}});

assignment.post("/employees/add", (req, res) => {value.addEmployee(req.body).then((value) =>{res.redirect("/employees");});})

assignment.get("/images",function(req,res){file_system.readdir("./public/images/uploaded", (err, obj) => {
  for (var randomvarname=0; randomvarname<obj.length; randomvarname++) {obj[randomvarname];}return res.json({ images: obj});})});

assignment.get("/employee/:empNum",(req,res)=>{value.getEmployeeByNum(req.params.empNum).then((value)=>{res.json(value);});});

assignment.use((req, res) => {res.status(404).send("Not Found");});

value.initialize().then(function(value){
  assignment.listen(HTTP_PORT, function(){console.log("server listening on " + HTTP_PORT) });});





