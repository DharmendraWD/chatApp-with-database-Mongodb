const express = require('express');
const mongoose = require('mongoose');
const { join } = require('node:path');

const userModel = require('./models/user');
const db = require('./config/conn');
const chatModel = require('./models/chat');


const { Server } = require("socket.io");
const { createServer } = require('http');
const app = express();
const server = createServer(app);
const io = new Server(server);




app.use(express.json()); // Middleware to parse JSON bodies

// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'index.html'));
// });
// route for chat  

io.on('connection', (socket) => {
    console.log('a user connected');
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);


    });
});

app.get('/chat', async (req, res) => {

        // Send the HTML file
        res.sendFile(join(__dirname, 'chat.html'), (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(err.status).end();
            } else {
                console.log('Chat HTML file sent successfully');
            }
        });

  
});


// APIS 
app.post('/chat/api', async (req, res)=>{
    try{
        const userMsg = new chatModel(req.body)
        await userMsg.save()
        res.status(201).json(userMsg)
    }catch(error){
        console.log('Error saving user message:', error);
        res.status(400).json({ message: error.message || 'An error occurred while saving the user message' });
    }
})

app.get('/chat/api', async (req, res)=>{
    try{
        const userMsg = await chatModel.find()
        res.status(200).json(userMsg)
    }catch(error){
        console.log('Error fetching user message:', error);
        res.status(400).json({ message: error.message || 'An error occurred while fetching the user message' });
    }
})






// ----------------------------------------------------------------------------
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

server.listen(3000, () => {    
    console.log(`Server is running`);
});
