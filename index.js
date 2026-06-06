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
mongoose.connect('mongodb://vinsup:vinsup@ac-rocumns-shard-00-00.vnd2hfr.mongodb.net:27017,ac-rocumns-shard-00-01.vnd2hfr.mongodb.net:27017,ac-rocumns-shard-00-02.vnd2hfr.mongodb.net:27017/?ssl=true&replicaSet=atlas-10ts8h-shard-0&authSource=admin&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });