const express = require('express');
const { body, validationResult } = require('express-validator');
const ContactForm = require('../models/contactschema.js');
const router = express.Router();



router.post('/submit', [
    body('name').isLength({ min: 5}).withMessage('Enter Your Name'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('subject').isLength({ min: 10 }).withMessage('Please Enter Subject'),
    body('message').isLength({ min: 10 }).withMessage('Please Enter Message')
    ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    try {
        const contactform = new ContactForm({ name, email, subject, message});
        await contactform.save();
        res.status(200).send('Form Submitted Successfully');
    } catch (error) {
        res.status(500).send('Error Submitting form');
    }
});

module.exports = router;