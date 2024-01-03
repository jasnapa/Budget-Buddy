import jwt from 'jsonwebtoken'
import UserModel from '../model/userModel'



export async function verifyUser(req, res, next) {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ isAuthenticated: false, message: 'Not authorised' })
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {

            if (err) {
                res.json({ status: false, message: "Unauthorized" })
            } else {
                const user = await UserModel.findById({ _id: decoded.id })
                if (user) {
                    req.userId = decoded.id
                    next()

                } else {
                    res.json({ status: false, message: "User not found" })
                }
            }
        })
    } catch (error) {
        console.error('Token verification failed:', error.message)
        return res.status(401).json({ isAuthenticated: false, user: null })
    }
}