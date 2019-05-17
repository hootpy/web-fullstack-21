const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const GameModel = require("./models/gameModel");

app.use(express.static('view'))


mongoose.connect("mongodb://localhost/mini-hack",
    {useNewUrlParser: true},
    function (err) {
        if (err) console.log(err);
        else console.log("DB connected!");
    });

app.use(bodyParse.urlencoded());
app.get("/",function (req,res) {
    res.sendFile(__dirname + '/view/index.html')
});


app.post("/create-game",function (req,res) {
    const {playerList} = req.body
    console.log(playerList)
    GameModel.create({
        playerName: playerList,
    },function (err,doc) {
        if(err) console.log(err);
        else {
            const url = `/game/?id=${doc._id}`;
            res.send(url)
        }
    })
})

app.get("/game",function (req,res) {
    res.sendFile(__dirname + "/view/game.html")
})

app.get("/getgame/:gameId", (req,res) =>{
    const {gameId} = req.params;
    GameModel.findById(gameId,function (err,doc) {
        if(err) console.log(err);
        else {
            res.send(doc);
        }
    })
})

app.post("/updategame",function (req,res) {
    const {gameData} = req.body;
    GameModel.findById(gameData.id,function (err,doc) {
        doc.roundScore = gameData.roundScore;
        doc.save()
    })
})


app.listen(8008,function (err) {
    if (err) console.log(err)
    else console.log("Server starts success!")
});