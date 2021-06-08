const bcrypt = require("bcrypt")

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const validateHash = (password, storedPassword) => {
    return bcrypt.compareSync(password, storedPassword)
}

module.exports = { generateHash, validateHash }