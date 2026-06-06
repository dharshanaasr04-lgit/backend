const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const userRoutes = require('./Routes/User');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });