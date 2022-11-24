const User = require('../models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    if(!email || !password ) {
        return res.status(422).send({ error: 'You must provide email and password' });
    }

    User.findOne({ email: email }, (err, existingUser) => {
        // see if user exists
        if(err) { return next(err); }

        // if user exist, return error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use'});
        }
        //if doesn't exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err) {
            if(err) { return next(err); }

            // respond to request indicating user created 
            res.json( { success: true });
        });

    })
}

exports.fetchUsers = async (req, res, next) => {
  let users;
  try {
     users = await User.find()
    } catch (err) {
        return next(err)
    }
    res.json({ users: users.map(user => user.email)})
}

exports.updateUser = async (req, res, next) => {
    const email = req.body.email;
    const _id = req.params.id;
    console.log(_id);
    let user; 
    try {
        user = await User.findOne({_id})
    } catch (err) {
        res.status(500).send({error: 'could not update user'})

        return next(err)
    }

    user.email = email;

    try {
        await user.save();
    } catch (err) {
        return next(err);
    }
    res.json({ user: user.email})
}

exports.deleteUser = async (req, res, next) => {
    const _id = req.params.id
    let user;
    try {
        user = await User.findOne({_id})
    } catch (err) {
        res.status(500).send({error: 'could not delete user'})
        return next(err)
    }
    try {
        await user.remove();
    } catch(err) {
        return next(err)
    }

    res.status(200).send({ success: 'Deleted user'});

}