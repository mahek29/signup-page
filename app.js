var faker= require("faker");
var mysql = require("mysql");
var express =require("express");
var bodyParser=require("body-parser");
var app=express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));




var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ur_password',
    database:'database_name'
});



app.get("/",function(req,res){
    var q="SELECT COUNT (*) as count FROM users";
    connection.query(q,function(err,results){
        if (err) throw err;
        var count = results[0].count;
        res.render("home",{count:count});
    });
    
});

app.post("/register",function(req,res){
    var person = {
        email:req.body.email
    };
    connection.query("INSERT INTO users SET ?",person,function(err,results){
        if (err) throw err;
        console.log(results);
        res.redirect("/");
    });
});

app.listen(3000,function(){
    console.log("Server is running at port!")
});
