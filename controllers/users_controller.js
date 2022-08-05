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

module.exports.create = (req, res) => {
    console.log("Signed Up ---> ", req.body);
    return res.redirect('back');
}
