const express = require("express")
const path = require("path")
const fs = require("fs")
const router = express.Router()
const User = require("../db/models/user")
const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")
const { validateHash, generateHash } = require("../utils/password-hash")
const upload = require("../middlewares/upload")
const generateToken = require("../middlewares/generateToken.js")

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (validateHash(password, user.password)) {
            generateToken(res, user._id)
            console.log("User logged in")
            res.send({ userId: user._id })
        }
        else {
            res.status(401).send({ error: "login unsuccessful" })
        }
    }
    catch (error) {
        res.status(404).send({ error: error, message: "UnU Error: no se encontró el usuario" })
    }

})

router.post("/create-account", upload.single('avatar'), async (req, res) => {
    const { name, email, password } = req.body
    console.log("req.file:", req.file)
    try {
        let user
        if (req.file) {
            const avatarObject = {
                data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
                contentType: req.file.mimetype
            };
            user = new User({ name, email, avatar: avatarObject, password: generateHash(password) })
        }
        else {
            user = new User({ name, email, password: generateHash(password) })
        }
        const newUser = await user.save()
        const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: 86400 })
        res.status(201).send({ user: newUser, token })
    }
    catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router