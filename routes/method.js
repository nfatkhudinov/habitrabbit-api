const Router = require('express')
const router = Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const validateAccessToken = require('../utils/solveAccessToken')
const jwt = require('jsonwebtoken')
const {accessTokenValidation, newHabitRequest, deleteHabitRequest} = require("../utils/validator");
const solveAccessToken = require('../utils/solveAccessToken')
const User = require('../models/User')
const authMiddleware = require('../middleware/authMiddleware')
const Habit = require("../models/Habit");

router.post('/getHabits', jsonParser, authMiddleware, async(req, res)=>{
       const user =  await User.findOne({_id: req.user._id})
       const foundHabits = await Habit.find({userId: user._id})
    console.log(foundHabits)
    res.json({foundHabits})
})

router.post('/newHabit', jsonParser, authMiddleware, async(req, res)=>{
    const {error} = newHabitRequest(req.body)
    if (error) res.json({error: true, message: 'Wrong fields'})
    const user =  await User.findOne({_id: req.user._id})
    const newHabit = await new Habit({userId: user._id, name: req.body.name}).save()
    console.log(newHabit)
    return res.json({message: 'New habit created', user: user._id, habit: newHabit})
})

router.post('/deleteHabit', jsonParser, authMiddleware, async(req, res)=>{
    const {error} = deleteHabitRequest(req.body)
    if (error) res.json({error: true, message: 'Wrong fields'})
    const foundHabit =  await Habit.findOne({_id: req.body.habitId})
    if (!foundHabit) return res.json({error: true, message: 'No such habit'})

    if (foundHabit.userId===req.user._id) {
        const deleted = await Habit.deleteOne({_id: req.body.habitId})
        return res.json({message: 'Habit deleted'})
    }
    return res.json({error: true})
})

module.exports=router