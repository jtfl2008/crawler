'use strict'

const mongoose = require('./db');
const Schema = mongoose.Schema;

const photo = Schema({
    title: String,
    type: Number,  // 美腿 1 性感 2 清纯 3
    photo: String,
    photoInfo: Array
});
  
module.exports = mongoose.model('Photo',photo);