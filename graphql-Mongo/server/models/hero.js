/*
* Create a hero schema for the mongoose database.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroSchema = new Schema({
    name: String,
});

//Exports the hero model.
module.exports = mongoose.model('Heroes', heroSchema);