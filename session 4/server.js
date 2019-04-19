const express = require('express');
const app = express();
const fs = require("fs")
const bodyParse = require('body-parser')


// data-type: application/x-www-
app.use(bodyParse.urlencoded())
app.get("/",function(req,res){
    //get random question
    res.sendFile(__dirname + "/view/home.html")
});

app.get("/vote/:id/:vote", (req,res) =>{
    const { id, vote} = req.params;
    const questionList = JSON.parse(
        fs.readFileSync("./questions.json", { encoding: "utf-8"})
    );
    if (vote === "yes"){
        questionList[id].yes++;
    } else {
        questionList[id].no++;
    }
    fs.writeFileSync("./questions.json", JSON.stringify(questionList));
    const url = `/question/${id}`
    res.redirect(url);
})




app.get("/randomquestion",(req,res) => {
    const questions = JSON.parse(fs.readFileSync("questions.json", {encoding:"utf-8"}));
    const randomQuestionNumber = Math.floor(Math.random()*questions.length);
    const question = questions[randomQuestionNumber];
    res.send(question)
})

app.get("/ask",function (req,res) {
    //ask random question
    res.sendFile(__dirname + "/view/ask.html")
})

app.post("/addquestion",function (req,res) {
    const {question} = req.body
    const questions = JSON.parse(
        fs.readFileSync("./questions.json",{encoding:'utf-8'})
    )
    const newQuestion = {
        question:question,
        yes: 0,
        no: 0,
        id: questions.length,
    }
    questions.push(newQuestion);
    fs.writeFileSync( "./questions.json",JSON.stringify(questions));
    let url = `/question/${questions.length - 1}`
    res.redirect(url)
})

app.get("/getquestioninfo",(req,res) => {
    const id = req.query.id;
    const questions = JSON.parse(fs.readFileSync("questions.json", {encoding:"utf-8"}))
    res.send(questions[id])
})

app.get("/question/:i",(req,res) =>{
    res.sendFile(__dirname + "/view/question.html")
})



app.listen(8008,function (err) {
    if (err) console.log(err)
    else console.log("Server starts success!")
})