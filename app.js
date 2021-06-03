const express = require('express');
const mongoose = require('mongoose');
const Launchpad = require('./models/launchpad');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json());

// Mongoose
mongoose.connect('mongodb://localhost/spacexClone', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
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
app.get('/roadster', (req,res)=>{
    const fetchRoadsters = async () => {
        Roadster.find({}, (err, roadsters)=>{
            if (err) console.log(err);
            console.log(roadsters);
            res.json(roadsters)
        })
    }
    fetchRoadsters();
})
app.get('/roadster/:id', (req, res) => {
    let _id = req.params.id; // pass down to function when called
    const fetchRoadster = (_id) => {
        Roadster.findOne({ _id }, (err, roadster) => {
            if (err) console.log(err);
            console.log(roadster);
            // response with json
            res.json(roadster);
        })
    }
    fetchRoadster(_id)
})
app.get('/launchpad', (req,res)=>{
    const fetchLaunchpads = async () => {
        Launchpad.find({}, (err, launchpads)=>{
            if (err) console.log(err);
            console.log(launchpads);
            res.json(launchpads)
        })
    }
    fetchLaunchpads();
})
app.get('/launchpad/:id', (req, res) => {
    let _id = req.params.id; // pass down to function when called
    const fetchLaunchpad = (_id) => {
        Launchpad.findOne({ _id }, (err, launchpad) => {
            if (err) console.log(err);
            console.log(launchpad);
            // response with json
            res.json(launchpad);
        })
    }
    fetchLaunchpad(_id)
})
app.listen(PORT, ()=>{
    console.log(`🎧Listening on ${PORT}`)
})