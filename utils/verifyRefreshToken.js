const UserToken = require('../models/UsetToken')
const jwt = require('jsonwebtoken')
const colors = require('colors')

const REFRESH_TOKEN_PRIVATE_KEY = 'Secret_for_refresh'
const verifyRefreshToken = async (refreshToken) =>{
   try{
       console.log('Trying to find token in database:', refreshToken.refreshToken)
       const findToken = await UserToken.findOne({token: refreshToken.refreshToken})
       if (!findToken) console.log('Cannot find such token'.red)
       console.log('Token found. \nOwner:', (findToken.userId).toString(),'\nCreated at:', findToken.createdAt)

       console.log('Start verifying token..')
       const {error, checkedToken} = await jwt.verify(refreshToken.refreshToken, REFRESH_TOKEN_PRIVATE_KEY)
       if (error) console.log('Verification failed')
       console.log('Verification passed')
       return Promise.resolve({findToken, error: false, message: 'Valid refresh token'} )
   }
   catch (e) {
       return Promise.reject(e)
   }
}

module.exports = verifyRefreshToken