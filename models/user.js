'use strict'

const mongoose = require('./db');
const Schema = mongoose.Schema;

const user = Schema({
    name: String,
    password: String,
    token: String
  });
  
  module.exports = mongoose.model('User',user);

