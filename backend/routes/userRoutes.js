const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/userschema.js');
const isUser = require('../middleware/isUser.js'); // Import the authentication middleware
const router = express.Router();



// Sign Up endpoint
router.post('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, mobile, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstname, lastname, email, mobile, password: hashedPassword });
        await user.save();
        res.status(200).send('User registered');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Sign In endpoint
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }
        const secretKey = '@djfsjjsv&khg#ggt452!i0%3J4KK'; 
        const token = jwt.sign({ user }, secretKey);
        res.status(200).json({ message: 'Sign In successful', token }); // Sending the generated token in response
    } catch (error) {
        res.status(500).send('Error signing in');
    }

    
});

// Example route protected by user authentication middleware
router.get('/user/profile', isUser.authUser, async (req, res) => {
    res.send('User profile page');
});

module.exports = router;
