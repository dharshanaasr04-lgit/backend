// const express = require('express');
// const router= express.Router();
// const User = require('../Schema/User');

// router.post('/register', async (req, res) => {
//     try {
//         const { name, college, department } = req.body;
//         const user = new User({ name, college, department });
//          await user.save();
//         res.status(201).json({ message: 'User created' });
//     }catch (error) {
//         res.status(500).json({ message: error.message } );

//     }
// });


// router.get('/user', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     }catch (error) {
//         res.status(500).json({ message: error.message } );
//     }
// });
// module.exports = router;

const express = require('express');
const router= express.Router();
const User = require('../Schema/User');
const bcrypt = require('bcrypt');
const auth = require('../auth/Middleware');


//register-post
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created' });
    }catch (error) {
        res.status(500).json({ message: error.message } );
    }   
});

//used to create user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
         await user.save();
        res.status(201).json({ message: 'User created' });
    }catch (error) {
        res.status(500).json({ message: error.message } );

    }
});

//get all data
router.get('/getall', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({ message: error.message } );
    }
});

//login
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email});
//         if (user) {
//             const isPasswordValid = await bcrypt.compare(password, user.password);
//             if (isPasswordValid) {
//                 const token = user.generateAuthToken();
//                 res.status(200).json({ message: 'Login successful', token });
//             }
    
//         } else {
//             res.status(401).json({ message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = user.generateAuthToken();

        return res.status(200).json({
            message: 'Login successful',
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

//get by id
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({ message: error.message } );
    }   
});

//update user
router.put('/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({ message: error.message } );
    }   
});
const updateUser = async () => {
    try {
      const response = await axios.put("http://localhost:5000/users/update", {
        name,
        email,
      });
      console.log("Updated User:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

//delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({ message: error.message } );
    }   
});


module.exports = router;