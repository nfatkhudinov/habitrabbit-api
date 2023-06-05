const db = require('mongoose').default
const Schema = db.Schema

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        name:{
            type: String,
        },
        surname:{
            type: String,
        },
        avatarLink:{
            type: String,
        },
    }
)

const User = db.model('User', userSchema)

module.exports = User