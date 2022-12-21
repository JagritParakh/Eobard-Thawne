const { Schema, model } = require('mongoose')

const snipe = new Schema({
    channelId : {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

module.exports = model("snipeSchema", snipe)