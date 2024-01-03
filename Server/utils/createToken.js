import jwt from 'jsonwebtoken'

export function createToken(id) {
    return jwt.sign({id},process.env.TOKEN_KEY,{
        expiresIn : 3 * 24 * 60 * 60,
    })
}