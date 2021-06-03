const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json());

// Mongoose
mongoose.connect('mongodb://localhost/familytree', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
const db = mongoose.connection;

db.once('open', ()=>{
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
})
db.on('error', ()=>{
    console.log('------ MongoDB Error ---');
})

// import models
const Roadster = require('./models/roadster')

// ROUTES
app.get('/', (req,res)=>{
    res.json({ message: "Space X Clone"});
})

app.listen(PORT, ()=>{
    console.log(`🎧Listening on ${PORT}`)
})