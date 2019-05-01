const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name: String,
    ingredients: String,
    directions: String,
    prep: String,
    cook: String, 
    total: String, 
    image:String
})

module.exports = mongoose.model('Recipe', recipeSchema)