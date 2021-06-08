const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    avatar: {
        data: Buffer,
        contentType: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "client"
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User
