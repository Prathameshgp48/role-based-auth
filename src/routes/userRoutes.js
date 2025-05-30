import express, { Router } from "express"
import verifyToken from "../middlewares/authMiddleware.js"
import authorizedRole from "../middlewares/roleMiddleware.js"

const userRouter = Router()

userRouter.get("/admin", verifyToken, authorizedRole("admin"), (req, res) => {
    res.json({message: "Welcome Admin"})
})

userRouter.get("/manager", verifyToken, authorizedRole("admin", "manager"), (req, res) => {
    res.json({message: "Welcome Manager"})
})

userRouter.get("/user", verifyToken, authorizedRole("admin", "manager", "user"), (req, res) => {
    res.json({message: "Welcome User"})
})

export default userRouter