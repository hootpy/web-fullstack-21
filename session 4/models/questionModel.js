const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const QuestionSchema = new Schema({
    question: {type: String,required: true},
    yes: {type: Number,default: 0},
    no: {type: Number,default: 0},
    index: {type: Number, required: true}
},{
    // _id: false,
    // versionKey: false,
    timestamps: true, // createdAt & updatedAt
});

const QuestionModel = model("question",QuestionSchema);

module.exports = QuestionModel;