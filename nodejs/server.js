const express = require("express");
const app = express();


app.use(express.static(__dirname + '/public'));

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/public/index.html");
})

//http://127.0.0.1:8008/number?number=3

app.get("/number",function (req,res) {
    const number = req.query.number;
    res.send(number);
})

app.get("/:number/:number1",function (req,res) {
    const number = req.params.number;
    res.send(number);
})

//Middleware
app.use(function (req,res) {
    res.send("404 Not Found!!!");
})


app.listen(8008,function (error) {
    if(error) console.log(error)
    else console.log("Server start success!")
})

