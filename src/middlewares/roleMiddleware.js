const authorizedRole = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(405).json({messagge: "Access Denied"})
        }
        next()
    }
}

export default authorizedRole