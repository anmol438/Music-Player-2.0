const User = require('../models/user');

module.exports.profile = (req, res) => {
    return res.render('user_profile');
}

module.exports.sign_in = (req, res) => {
    return res.render('user_sign_in');
}

module.exports.sign_up = (req, res) => {
    return res.render('user_sign_up');
}

module.exports.create_session = (req, res) => {
    console.log("Logged In ---> ", req.body);
    return res.redirect('back');
}

module.exports.create = async (req, res) => {
    try {

        if(req.body.password != req.body.confirm_password){
            console.log("Password does not match");
            return res.redirect('back');
        }else{
            let user = await User.findOne({email: req.body.email});
            if(!user){
                let user = await User.create(req.body);
                console.log("Sign Up successfull");
                return res.redirect('/users/sign-in');
            }else{
                console.log("User already exists");
                return res.redirect('back');
            }
        }
        
    } catch (err) {
        console.log("Error in signing up ---> ", err);
    }
    
    
    return res.redirect('back');
}
