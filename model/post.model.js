const mongoose = require("mongoose")

const dogSchema = mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    place: String,
    gender: String
})

const DogModel = mongoose.model("dogs", dogSchema)

module.exports = { DogModel }