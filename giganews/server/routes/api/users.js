const express = require('express')
let router = express.Router()
require('dotenv').config()
const { checkLoggedIn } = require('../../middleware/auth')
const { grantAccess } = require('../../middleware/roles')

// model
const { User } = require('../../models/user_model')

router.route('/register')
.post( async (req,res)=>{
    try {
        //1 check if email is ok
        if(await User.emailTaken(req.body.email)){
            return res.status(400).json({message:'Sorry email already taken'})
        }

        //2 creating the model (hash the password)
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })

        //3 generate token
        const token = user.generateToken()
        const doc = await user.save()
        
        //4 send email

        //save user.. send token with cookie
        res.cookie('x-access-token', token)
        .status(200).send(getUserProps(doc))

    } catch(error){
        res.status(400).json({message:'Error', error: error})
    }
})

router.route('/signin')
.post( async(req,res)=>{
    try {
        // find the user
        let user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json({message:'User not found'})

        // compare passwords
        const compare = await user.comparePassword(req.body.password)
        if(!compare) return res.status(400).json({message: 'Incorrect password'})

        // generate token
        const token = user.generateToken()

        // send response
        res.cookie('x-access-token', token)
        .status(200).send(getUserProps(user))

    } catch(error) {
        res.status(400).json({message:'Error',error: error })
    }
} )

router.route('/profile')
.get(checkLoggedIn,grantAccess('readOwn', 'profile'), async (req,res) => {
    try{
        const permission = res.locals.permission
        const user = await User.findById(req.user._id)
        if(!user) return res.status(400).json({message:'User not found'})
    
        res.status(200).json(permission.filter(user._doc))
    } catch(error){
        return res.status(400).send(error)
    }
    

})
.patch(checkLoggedIn, grantAccess('updateOwn', 'profile'), async (req,res) => {
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                "$set":{
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age
                }
            },
            { new: true }
        )
        if(!user) return res.status(400).json({message:'User not found'})
        res.status(200).json(getUserProps(user))

    } catch(error){
        res.status(400).json({message:"Problem updating", error:error})
    }
})


router.route('/update_email')
.patch(checkLoggedIn, grantAccess('updateOwn', 'profile'), async (req,res) => {
    try{
        /// make
        if(await User.emailTaken(req.body.newemail)){
            return res.status(400).json({message:'Sorry email already taken'})
        }

        const user = await User.findOneAndUpdate(
            { _id: req.user._id, email: req.body.email },
            {
                "$set":{
                    email:req.body.newemail
                }
            },
            { new:true }

        )
        if(!user) return res.status(400).json({message:'User not found'})

        const token = user.generateToken()
        res.cookie('x-access-token', token)
        .status(200).send({email:user.email})

    } catch(error){
        res.status(400).json({message:"Problem updating", error:error})
    }
})


router.route('/isauth')
.get(checkLoggedIn, async (req,res) => {
    res.status(200).send(getUserProps(req.user))
})


const getUserProps = (props) => {
    return{
        _id: props._id,
        email: props.email,
        firstname: props.firstname,
        lastname: props.lastname,
        age: props.age,
        role: props.role
    }
}

module.exports = router