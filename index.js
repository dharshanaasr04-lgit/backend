const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const userRoutes = require('./Routes/User');

app.use(express.json());
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
mongoose.connect('mongodb://localhost:27017/Batch13')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });