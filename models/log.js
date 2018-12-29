'use strict'

const mongoose = require('./db');
const Schema = mongoose.Schema;

const log = Schema({
    level: String,
    message: String
});
  
module.exports = mongoose.model('Log',log);