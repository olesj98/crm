const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email });

    if(candidate) {
        // Check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

        if(passwordResult) {
            // password found
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 3600 });

            res.status(200).json({ token: `Bearer ${token}` });
        } else {
            // password doesn't match
            res.status(401).json({
                message: 'Password doesn\'t match.'
            });
        }
    } else {
        // User not found
        res.status(404).json({
            message: 'User not found.'
        });
    }
}

module.exports.register = async (req, res) => {
    // looking for user.email in DB
    const candidate = await User.findOne({ email: req.body.email });

    if(candidate) {
        // user already exists
        res.status(409).json({
            message: 'This email is taken.'
        });
    } else {
        // we should create user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt) // standartnyj odnostoronnij hash
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch(err) {
            errorHandler(res, err);
        }
    }
}

module.exports.users = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch(err) {
        errorHandler(res, err);
    }
}