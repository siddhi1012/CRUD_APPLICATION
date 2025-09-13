const mongoose = require('mongoose')
const bookschema = new mongoose.Schema({

    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: String,
    publishedYear: Number,
    available: { type: Boolean, default: true }
});
module.exports = mongoose.model("book", bookschema);