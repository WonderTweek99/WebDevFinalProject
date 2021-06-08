const mongoose = require("mongoose")
const User = require("../models/user")
const { generateHash } = require("../../utils/password-hash")
const mongoURI = "mongodb://localhost:27017/crud-api"

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        console.log("OwO connected to mongoose")
        createAdmin()
    }
    catch (error) { throw new Error(error) }
}

const createAdmin = () => {
    const adminData = { name: "Otto", email: "jopc1999@hotmail.com", password: generateHash("1234"), role: "admin" }
    const options = { upsert: true, new: true };
    User.findOneAndUpdate({ email: adminData.email }, adminData, options)
    .then((doc)=>{
        console.log("doc",doc)
    })
    console.log("AwA admin created")

}

module.exports = connectToDatabase