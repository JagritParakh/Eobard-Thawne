const { Schema, model } = require('mongoose')

const esnipe = new Schema({
    channelId : {
        type: String,
        required: true
    },
    oldMessage: {
        type: String,
        required: true
    },
    newMessage: {
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

module.exports = model("esnipeSchema", esnipe)