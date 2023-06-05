const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_PRIVATE_KEY = 'Secret_for_access'

const authMiddleware = async(req, res, next) =>{
        const token = req.header("x-access-token");
        if (!token) return res.json({error: true, message: 'No token in header'})
        try{
            const tokenDetails = jwt.verify(token, ACCESS_TOKEN_PRIVATE_KEY)
            req.user = tokenDetails
            console.log(req.user)
            next();
        }
        catch (e) {
            return res.json({error: true, message:'Token validation error'})
        }
}

module.exports=authMiddleware