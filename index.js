const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./models/user');
const db = require('./config/conn');


const port = 3000;


app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('Hello World');
});

// POST USERS API
app.post('/users', async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(400).json({ message: error.message || 'An error occurred while saving the user' });
    }
});

// GET USERS API
app.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: error.message || 'An error occurred while fetching users' });
    }
});

// GET USER BY ID API
app.get('/users/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: error.message || 'An error occurred while fetching the user' });
    }
});

// UPDATE USER BY ID API
app.put('/users/:id', async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });                     
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ message: error.message || 'An error occurred while updating the user' });
    }
});

// DELETE USER BY ID API
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ message: error.message || 'An error occurred while deleting the user' });
    }
});         

app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
});
