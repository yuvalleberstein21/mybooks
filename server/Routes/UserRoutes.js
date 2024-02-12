const express = require('express');
const User = require('../Models/UserModel');
const generateToken = require('../utils/generateToken');

const userRoutes = express.Router();

userRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        })
    } else {
        return res.status(401).send({ message: 'Invalid username or password' });

    }
});

userRoutes.post('/', async (req, res) => {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });

    if (userExists) {
        return res.status(401).send({ message: 'User already exists' });
    }

    const user = await User.create({
        username,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        return res.status(400).send({ message: 'Invalid user data' });
    }
});


module.exports = userRoutes;