const validator = require('validator');


const validateSignUpData = (req) => {

    const { firstName, lastName, email, password } = req.body;

    if(firstName.length < 3 || firstName.length > 50) { 
        throw new Error('First name must be at least 3 characters long and at most 50 characters long');
    }
    if(lastName.length < 3 || lastName.length > 50) { 
        throw new Error('Last name must be at least 3 characters long and at most 50 characters long');
    }
    if(!validator.isEmail(email)) { 
        throw new Error('Invalid email address');
    }
    if(!validator.isStrongPassword(password)) { 
        throw new Error('Password is not strong enough');
    }

}

module.exports = {
    validateSignUpData
}