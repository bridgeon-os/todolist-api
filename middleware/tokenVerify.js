const jwt = require('jsonwebtoken');

module.exports = {
    tokenVerify: (req, res, next) => {
        console.log(req.body)
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ error: "Unauthrized ❗" })
        }

        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(decoded){
                req.body.apiKey = decoded.apiKey
            }
            if (err) {
                return res.status(403).json({ error: "Invalid token ❌" })
            }
            next()
        })
    }


}


