const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const signUpBodyValidation = (body)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
        name: Joi.string(),
        surname: Joi.string(),
        avatarLink: Joi.string(),
    })
    return schema.validate(body)
}

const loginBodyValidation = (body)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
    })
    return schema.validate(body)
}

const refreshTokenValidation = (body)=>{
    const schema = Joi.object({
        refreshToken: Joi.string().required()
    })
    return schema.validate(body)
}

const accessTokenValidation = (body)=>{
    const schema = Joi.object({
        accessToken: Joi.string().required()
    })
    return schema.validate(body)
}

const newHabitRequest = (body)=>{
    const schema = Joi.object({
        name: Joi.string().required()
    })
    return schema.validate(body)
}

const deleteHabitRequest = (body)=>{
    const schema = Joi.object({
        habitId: Joi.string().required()
    })
    return schema.validate(body)
}




module.exports={signUpBodyValidation, loginBodyValidation, refreshTokenValidation, accessTokenValidation, newHabitRequest, deleteHabitRequest}