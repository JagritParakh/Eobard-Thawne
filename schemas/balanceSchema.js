const { Schema,model } = require('mongoose')
const balance = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    daily: Number,
    bal: {
        type: Number,
        default: 0
    }
})

module.exports = model("balanceSchema",balance)