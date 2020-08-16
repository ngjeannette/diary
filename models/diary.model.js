const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = new Schema({
    username: String,
    userID: String,
    text: String,
    title: String,
    image : [],
},{timestamps: true})

const Diary = mongoose.model('Diary', diarySchema);
module.exports = Diary;