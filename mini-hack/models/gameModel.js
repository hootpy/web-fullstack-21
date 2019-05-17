const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const GameSchema = new Schema({
    playerName: {type: Array},
    roundScore: {type: Array,default:[]},
});


const GameModel = model("Game",GameSchema);

module.exports = GameModel;