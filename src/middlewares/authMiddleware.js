import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
    let token
    const authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]

        if(!token) {
            return res.status(401).json({message: "Unauthorized request."})
        }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodeToken
        console.log("decoded user:"+ JSON.stringify(req.user))
        next()
    } catch (error) {
        return res.status(401).json({message: "Invalid Token"})
    }
  } else {
     return res.status(401).json({message: "No token authorization denied"})
  }
}

export default verifyToken