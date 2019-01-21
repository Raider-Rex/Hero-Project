const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Heroes', heroSchema);