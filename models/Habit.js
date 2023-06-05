const db = require('mongoose').default
const Schema = db.Schema

const habitSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        completed:{
            type: Boolean,
            default: false,
        }
    }
)

const Habit = db.model('Habit', habitSchema)
module.exports = Habit