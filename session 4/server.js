const express = require('express');
const app = express();
const fs = require("fs")
const bodyParse = require('body-parser')


// data-type: application/x-www-
app.use(bodyParse.urlencoded())
app.get("/",function(req,res){
    //get random question
    const questions = JSON.parse(fs.readFileSync("questions.json", {encoding:"utf-8"}));
    const randomQuestionNumber = Math.floor(Math.random()*questions.length);
    const question = questions[randomQuestionNumber];
    res.send(`
    <h1>${question.question}</h1>
    <form action="/questions" method="post">
    <input type="text" name="questionNumber" value="${randomQuestionNumber}" hidden></input>
    <a><button name="answer" value="yes">Yes</button></a>
    <a><button name="answer" value="no">No</button></a>
</form>
    
    <a href="/question/${randomQuestionNumber}">Ket qua vote</a>
    <a href="/">Cau hoi khac</a>
    <a href="/ask">Dat cau hoi</a>
    `)

});

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
    res.send("Thank you for your question!")
})


app.get("/question/:question_number",function (req,res) {
    const {question_number} = req.params
    const questions = JSON.parse(fs.readFileSync("questions.json", {encoding:"utf-8"}))
    if (question_number >= questions.length) {
        res.send("Wrong question");
    } else {
        const question = questions[question_number];
        const question_text= question.question;
        const yes_number = question.yes;
        const no_number = question.no;
        res.send(`
        <h1>${question_text}</h1>
        <span>${yes_number}</span>
        <span>${no_number}</span>
        <a href="/"><button>Xem cau hoi khac</button></a>
        `);
    }
})

app.post("/questions",function (req,res) {
    const {questionNumber} = req.body
    const {answer} = req.body
    const questions = JSON.parse(fs.readFileSync("questions.json", {encoding:"utf-8"}))
    const question = questions[questionNumber]
    if(answer === "yes"){
        question.yes += 1;
    } else if (answer === "no"){
        question.no += 1;
    }
    fs.writeFileSync( "./questions.json",JSON.stringify(questions));
    const url = `/question/${questionNumber}`
    res.redirect(url)
})




app.listen(8008,function (err) {
    if (err) console.log(err)
    else console.log("Server starts success!")
})