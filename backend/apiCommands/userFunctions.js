require("dotenv").config();
const db = require('../Models/DB')
const mongoose = require('mongoose')
const { response } = require('express')


const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { json } = require('body-parser')


//User registration
const registerUser = async(req, res) =>
{
    //there are the fields needed to register a user
    //create a form with these fields for frontend
    let {username, name, email, password, dob} = req.body


    const userInDb = await db.User.findOne({username : username})

    const emailInDb = await db.User.findOne({email : email})
    dob instanceof Date;

    //email and username must be unique
    if(userInDb != null && emailInDb != null)
    {
        res.send("User already in db, too slow, slow poke")
    }
    else
    {
    

    req.body.password = bcrypt.hashSync(req.body.password, 10);
        
    console.log(password)
        
    const newUser = new db.User({
        name: name,
        username: username,
        password: req.body.password,
        email: email,
        dateOfBirth: dob
        });
        
    newUser.save()
    res.json(newUser)
    }
}

//For login page checks for valid credentials then creates a JWT
//JWT is sent back and will need to be put in local storage to be used on all pages
const loginUser = async (req, res) => 
{
    //use username and password to login
    const {username, password} = req.body

    db.User.findOne({username : username}, function(err, person){

    if(err)
    {
        res.send("Invalid login, get your info correct next time")
    }
    else
    {
        console.log(person.password, password)
        bcrypt.compare(password, person.password)
        .then(isCorrect =>{  
            console.log(isCorrect) 
            if(isCorrect){
                const user = {
                    id: person._id,
                    username: person.username
                }
                jwt.sign(user, process.env.JWT_SECRET, {expiresIn: 86400}, (err, token) =>{
                                                                                            if(err){
                                                                                                console.log("oops!", err)
                                                                                                console.log(JSON.stringify(user))
                                                                                                return res.json({message: err});
                                                                                            }
                                                                                            return res.json({
                                                                                                message: 'Login Successfully',
                                                                                                token: 'Bearer ' + token
                                                                                            })                                
                                                                                        })    
            }
            else{
                res.send("Invalid password or username! You have no businesss being here. Pet smuggler")
            }
            }) 
    }
    })
}


//this verifys the logged in user.
//not important for frontend
function verifyJWT(req, res, next){
    const token = req.headers["x-access-token"]?.split(' ')[1]
    console.log(token)
    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err)
            {
                console.log(err)
                return res.json({
                    isLoggedIn : false,
                    message: "Failed to authenticate, she doesn't even go here"
                })
            }
            console.log("I am here")
            req.user = {}
            req.user.id = decoded.id
            req.user.username = decoded.username
            next()

            
        })
    }
    else
    {
        res.json({message: "Incorrect token given, Who are you?",
                    isLoggedIn : false})
    }
}

//gets a user from id
//url: api/user/:id
//probably not super useful
const getUser = async (req, res) =>
{
    const { id } = req.params

    const post = await db.User.findOne({username: id}).populate('pets')

    res.status(200).json(post)
    
}

//gets the currently logged in users' profile
//url: api/user

const getProfile = async (req, res) =>
{
    const post = await db.User.findOne({username: req.user.username}).populate('pets')

    res.status(200).json(post)
    
}

//allows a user ot add an adidtional pet to their profile
//this could be down right after registering or anytime in the profile page
//url: api/user/addPet
const addPet = async (req, res) =>
{
    //a new pet will need these fields to be created
    let {name, animal, breed, tags} = req.body
    
    try {
        const newPet = await db.Pet.create({name, animal, breed, tags})
        const petOwner = await db.User.findOne({username: req.user.username})

        petOwner.pets.push(newPet._id)

        await petOwner.save();
        const returnUser = await db.User.findOne({username: req.user.username}).populate('pets')

        res.status(200).json(returnUser)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
}


//update a user profile
//url: api/user
//could use some work but currently just updates using the req body
const updateUser = async (req, res) => {
    // const { id } = req.params

    const userToUpdate = await db.User.findOneAndUpdate({username: req.user.username}, {
         ...req.body
    })

    if (!userToUpdate) {
        return res.status(400).json({error: 'No such User'})
    }

    const user = await db.User.findOne({_id: req.user.id}).populate('pets')

    res.status(200).json(user)
}

//gets a list of all of the logged in user's posts.
//url: api/user/myPosts
//all fields are populated
const getMyPosts = async(req,res) => {
    console.log(req.user.username)
    const userPosts = await db.Post.find({author : req.user.id}).populate('author').populate('pet').populate('comments')
    
    res.status(200).json(userPosts)
}

//gets a list of all of the logged in user's pets
//url: api/user/myPets
const getMyPets = async(req,res) => {
    console.log(req.user.username)
    
    const pets = await db.User.findOne({username: req.user.username}).populate('pets').select('pets -_id')
   

    res.status(200).json(pets)
}

module.exports = {
    getUser,
    updateUser,
    registerUser,
    loginUser,
    getProfile,
    addPet,
    getMyPosts,
    getMyPets,
    verifyJWT
    }