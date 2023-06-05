const Router = require("express");
const {signUpBodyValidation, loginBodyValidation} = require("../utils/validator");
const router = Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const User = require("../models/User");
const generateRefreshToken = require("../utils/refreshTokenGenerator");
const generateAccessToken = require('../utils/accessTokenGenerator')
const jsonParser = bodyParser.json()

router.post('/signup', jsonParser, async (req,res)=>{
    try{
        const {error} = signUpBodyValidation(req.body)
        console.log(req.body)
        /** Validation check **/
        if (error) {
            return res.status(400).json({
                error: true,
                message: error.details[0].message
            })
        }
        /**Already exist check**/
        const existUser = await User.findOne({email: req.body.email})
        existUser&&res.json({error: true, message: 'Email already exists'})
        /**Hash password**/
        const hashedPassword = await bcrypt.hash(req.body.password, 7)

        /**Save user to database**/
        await new User({...req.body, password: hashedPassword}).save()

        /**Return response**/
        return res.json({
            error: false,
            message: 'New user created successfully',
            userName: req.body.userName,
            userPassword: hashedPassword,
        })
    }
    catch (e) {
        res.json({error: true, message: 'Internal server error'})
    }
})

router.post('/login',jsonParser, async (req,res)=>{
    try{
        const {error} = loginBodyValidation(req.body)
        if (error) return res.status(400).json({error: true, message: error.details[0].message})

        /**Trying to find user with requested Email in database**/
        const findUser =  await User.findOne({email: req.body.email})
        if (!findUser) return res.status(406).json({error: true, message: 'Cannot find user with this email in database'})

        /**Compare hashed passwords**/
        const verifiedPassword = await bcrypt.compare(req.body.password, findUser.password)
        if (!verifiedPassword) return res.status(403).json({error: true, message: 'Comparing passwords failure'})

        const refreshToken = await generateRefreshToken(findUser, req.get('User-Agent'), req.ip)
        const accessToken = await generateAccessToken(findUser)


        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: 'Login successful'
        })

    }
    catch (e) {
        res.status(400).json({error: true, message: `${e}`})
    }
})


module.exports=router