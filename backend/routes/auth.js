const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "MyNameIsHarry";
// Route 1: Create a user using POST '/api/auth/createuser'. No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').notEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast of 5 characters').isLength({ min: 5 })

], async (req, res) => {
    // if errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erroer: errors.array() });
    }
    try {
        // check whether user with same email already exits
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry, user with this email already exits" });
        }
        // Add a password hashing with salt
        const salt = await bcrypt.genSalt(10);
        const secPass = await (bcrypt.hash(req.body.password, salt));

        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass   
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // res.json(user);
        res.json({authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error occured!");
    }
   
});

// Route 2: Authenticate a User using POST '/api/auth/login'. No login required
router.post('/login', [
    body('email', 'Enter a valid Email').notEmpty(),
    body('password', 'Password cannot be blank').notEmpty()
] , async (req, res) => {
    // check for errors
    const errors = validationResult(req);
    if(!errors) {
        return res.status(400).json({errors : errors.array()})
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error : "Please tyr to login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
        
    }
});

// Route 3: Get the loggedIn user details using POST '/api/auth/getuser'. Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password") 
        res.send(user);
        // res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error");
    }
})

module.exports = router;