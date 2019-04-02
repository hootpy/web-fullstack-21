const express = require("express");
const app = express();
const fs = require("fs");





app.set('view engine', 'pug')


app.use(express.static(__dirname + '/public'));

app.get("/",function (req,res) {
    var classList = [];
    const dataFolder = './data/';
    fs.readdirSync(dataFolder).forEach(file => {
        classList.push(file.replace(".json",""));
    });
    res.render('index',{title: "Fullstack 21",value: classList});
})

app.get("/:className", function (req,res) {
    const className = req.params.className;
    const data = JSON.parse(fs.readFileSync(__dirname + "/data/" + className + ".json",{encoding: "utf-8"}))
    res.render('data',{title: "Fullstack 21", value: data});
})

// //http://127.0.0.1:8008/number?number=3
//
// app.get("/number",function (req,res) {
//     const number = req.query.number;
//     res.send(number);
// })
//
// app.get("/:number/:number1",function (req,res) {
//     const number = req.params.number;
//     res.send(number);
// })


//Middleware
app.use(function (req,res) {
    res.send("404 Not Found!!!");
})


app.listen(8008,function (error) {
    if(error) console.log(error)
    else console.log("Server start success!")
})

