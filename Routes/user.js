const express = require('express');
const router= express.Router();
const User = require('../Schema/User');

router.post('/register', async (req, res) => {
    try {
        const { name, college, department } = req.body;
        const user = new User({ name, college, department });
         await user.save();
        res.status(201).json({ message: 'User created' });
    }catch (error) {
        res.status(500).json({ message: error.message } );

    }
});


router.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({ message: error.message } );
    }
});
module.exports = router;