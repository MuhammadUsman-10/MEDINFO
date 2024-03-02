const mongoose = require('mongoose');

// Define Admin Schema
const contactschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        unique: true,
    },
});

//Define Contact Form Model
const ContactForm= mongoose.model('ContactForm', contactschema);
module.exports = ContactForm;