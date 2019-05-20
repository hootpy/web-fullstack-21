const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const  PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId,ref: 'user', require: true},
    date: {type: Date, require: true},
    post: {type: String},
    view: {type: Number,default: 0},
    title: {type: String},
    like: {type: Number, default: 0},
    image: {type: String, require: true}
});

const PostModel = model("post",PostSchema);

module.exports = PostModel;
