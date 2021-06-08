const express = require("express")
const router = express.Router()
const upload = require("../middlewares/upload")
const User = require("../db/models/user")
const fs = require("fs")
const { generateHash } = require("../utils/password-hash")

router.get("/", async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    User.deleteOne({ _id: id })
        .then((doc) => {
            res.send(doc)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const users = await User.findOne({ _id: id })
        console.log("Users", users)
        res.send(users)
    }
    catch {
        res.status(404).send({ error: "UnU Error: no se encontró el usuario" })
    }
})

router.patch("/:id", upload.single('avatar'), async (req, res) => {
    const { id } = req.params

    const { name, avatar, password } = req.body
    console.log("")
    const newUser = { name, password: password ? generateHash(password) : null }
    for (let x in newUser) {
        if (!newUser[x]) delete newUser[x]
    }
    try {
        if (avatar) {
            const avatarObject = {
                data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
                contentType: req.file.mimetype
            };
            newUser.avatar = avatarObject
        }
        const userEdit = await User.findOneAndUpdate({ _id: id }, newUser)
        res.send(userEdit)
    }
    catch {
        res.status(404).send({ error: "UnU Error: no se encontró el usero" })
    }
})
module.exports = router