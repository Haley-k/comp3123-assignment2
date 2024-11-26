const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date()
        });

        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user_id: newUser._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;