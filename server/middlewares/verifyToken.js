const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({message: "Unauthorized"});
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) return res.status(403).json({message: "Forbidden"});
        req.user = user;
        next();
    });
}

module.exports = verifyToken;