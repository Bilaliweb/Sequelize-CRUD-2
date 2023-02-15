const model = require('../models/model')
const validator = require('fastest-validator')
const emailValidator = require('node-email-validation')

let save = (req, res, next) => {

    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const post = {
        fullName: req.body.fullName,
        age: req.body.age,
        email: req.body.email
    }

    const schema = {
        fullName: {type: "string", optional: false, max: "100"},
        age: {type: "number", optional: false, max: 150},
        email: {type: "string", optional: false, max: 500}
    }

    
    const val = new validator()
    const validateResponse = val.validate(post, schema)
    
    if(validateResponse !== true){
        console.log("Please enter valid credentials...")
        return res.status(400).json({
            message: "Validation Failed",
            errors: validateResponse
        })
    }
    // if(emailValidator.is_email_valid(post.email) !== true){
    //     console.log("Email is invalid...")
    //     return res.status(400).send({
    //         message: "Please Enter a valid email",
    //         // errors: emailValidator
    //     })
    // }

    if(!post.email.match(validRegex)){
        console.log("New logic for email validation.")
        return res.status(400).send({
            message: "Invalid Email"
        })
    }
    next()
}

module.exports = save;