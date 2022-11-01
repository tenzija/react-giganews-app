const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
require('dotenv').config()

const userSchema =  mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true, // removes spaces
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user',
    },
    firstname:{
        type:String,
        trim:true,
        maxLength: 13,
        minLength: 2
    },
    lastname:{
        type:String,
        trim:true,
        maxLength: 13,
        minLength: 2
    },
    age:{
        type:Number
    },
    date:{
        type:Date,
        default: Date.now
    }
},{
    timestamps:true
    // collection:'Players' - changes default name (from User to Players)
})

userSchema.pre('save', async function(next){
    let user = this
    if(user.isModified('password')){
        // hash
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
    }
    next()
})

userSchema.methods.generateToken = function(){
    let user = this
    const userObj = { _id:user._id.toHexString(), email:user.email }
    const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn:'1d' })
    return token
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const user = this
    const match = await bcrypt.compare(candidatePassword, user.password)
    return match
}

userSchema.statics.emailTaken = async function(email){
    const user = await this.findOne({
        email
    })
    return !!user
}

const User = mongoose.model('User', userSchema)
module.exports = { User }