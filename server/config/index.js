const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 9000
const jwtSecret = process.env.JWTSECRET
module.exports = { port, jwtSecret }