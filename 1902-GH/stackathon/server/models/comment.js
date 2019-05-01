const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    name: String,
    content: String,
    recipeId: String
})

module.exports = mongoose.model('Comment', commentSchema)