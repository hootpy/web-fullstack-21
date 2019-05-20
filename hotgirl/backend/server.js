const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/hot-girl",
    { useNewUrlParser: true }, //disable warning!!!
    function (err) {
        if(err) console.log(err);
        else console.log("DB connected!");

        // QuestionModel.create({
        //     question: "Hello",
        // },function (err,docCreated) {
        //     if(err) console.log(err);
        //     else console.log("Created!");
        // });
        //
        // QuestionModel.find({},function (err,docs) {
        //     if(err) console.log(err);
        //     else console.log("Questions:", docs);
        // })
    });


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const userApiRouter = require('./routers/userApi');
app.use("/api/users",userApiRouter);


app.listen(8008,function (err) {
    if (err) console.log(err)
    else console.log("Server starts success!")
});