const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "MyNameIsHarry";
// create a user using POST '/api/auth/createuser'. No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').notEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast of 5 characters').isLength({ min: 5 })

], async (req, res) => {
    // console.log(req.body);
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
        const salt = await bcrypt.genSalt(10);
        const secPass = await (bcrypt.hash(req.body.password, salt));

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
        // console.log(authToken);
        // res.json(user);
        res.json({authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error occured!");
    }
   
});

module.exports = router;