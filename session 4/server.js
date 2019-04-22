const express = require('express');
const app = express();

const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const QuestionModel = require("./models/questionModel");


mongoose.connect("mongodb://localhost/quyet-de-21",
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







// data-type: application/x-www-
app.use(bodyParse.urlencoded());
app.get("/",function(req,res){
    //get random question
    res.sendFile(__dirname + "/view/home.html")
});

app.get("/vote/:index/:vote", (req,res) =>{
    const { index, vote } = req.params;
    // const questionList = JSON.parse(
    //     fs.readFileSync("./questions.json", { encoding: "utf-8"})
    // );
    // if (vote === "yes"){
    //     questionList[id].yes++;
    // } else {
    //     questionList[id].no++;
    // }
    // fs.writeFileSync("./questions.json", JSON.stringify(questionList));
    // const url = `/question/${id}`;
    // res.redirect(url);
    QuestionModel.findOne({index: index},function (err,question) {
        if (err) console.log(err)
        else {
            if(vote === "yes"){
                question["yes"]++
            } else{
                question["no"]++
            }
            question.save()
            const url = `/question/${index}`
            res.redirect(url)
        }
    })
});




app.get("/randomquestion",(req,res) => {
    QuestionModel.countDocuments({},(err,docs) =>{
        if(err) console.log(err)
        else {
            const randomIndex = Math.floor(Math.random()*docs);
            QuestionModel.findOne({index: randomIndex}, (err,question) =>{
                if(err) console.log(err)
                else {
                    res.send(question);
                }
            })
        }
    })
});

app.get("/ask",function (req,res) {
    //ask random question
    res.sendFile(__dirname + "/view/ask.html")
});

app.post("/addquestion",function (req,res) {
    const {question} = req.body;
    // const questions = JSON.parse(
    //     fs.readFileSync("./questions.json",{encoding:'utf-8'})
    // );
    // const newQuestion = {
    //     question:question,
    //     yes: 0,
    //     no: 0,
    //     id: questions.length,
    // };
    // questions.push(newQuestion);
    // fs.writeFileSync( "./questions.json",JSON.stringify(questions));
    // let url = `/question/${questions.length - 1}`
    QuestionModel.countDocuments({},function (err, count) {
        if(err) console.log(err)
        else {
            QuestionModel.create({
                question: question,
                index: count,
            },function (err) {
                if(err) console.log(err)
                else {
                    const url = `/question/${count}`;
                    res.redirect(url)
                }
            })
        }
    })

});

app.get("/getquestioninfo",(req,res) => {
    const id = req.query.id;
    QuestionModel.findOne({index:id},function (err,doc) {
        if(err) console.log(err);
        else {
            res.send(doc);
        }
    })
});

app.get("/question/:i",(req,res) =>{
    res.sendFile(__dirname + "/view/question.html")
});



app.listen(8008,function (err) {
    if (err) console.log(err)
    else console.log("Server starts success!")
});