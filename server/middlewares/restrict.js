const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

const restrict = async (req, res, next) => {
    const token = req.cookies?.token || ""
    console.log("Cookies", token)
    try {
        if (!token) {
          return res.status(403).send
        }
        const decrypt = await jwt.verify(token, process.env.JWTSECRET);
        req.user = {
          userId: decrypt.userId,
        };
        next();
      } catch (err) {
        return res.status(500).json(err.toString());
      }
    };
    

module.exports = restrict