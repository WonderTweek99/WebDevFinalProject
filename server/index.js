const express = require("express")
const path = require("path")
const cors = require("cors")
const {port} = require("./config")
const usersApi = require("./routes/users-api")
const productsApi = require("./routes/products-api")
const authApi = require("./routes/auth-api")
const restrict = require("./middlewares/restrict")
const connectToDatabase = require("./db/scripts/connection-handler")
const cookieParser = require('cookie-parser');
const app = express()

//Middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())
//Routes
app.use(express.static(path.join(__dirname, "../public"), {extensions: ["html"]}))
app.use("/users", restrict, usersApi)
app.use("/products", restrict, productsApi)
app.use("/auth", authApi)

connectToDatabase()
    .then(() => {
        app.listen(port, () => console.log("Listening on port", port, " uwu"))
    })
    .catch((error) => {
        console.error(error)
    })
