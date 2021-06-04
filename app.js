const express = require('express');
const mongoose = require('mongoose');
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
const Launchpad = require('./models/launchpad');
const Roadster = require('./models/roadster');
const Capsule = require('./models/capsule');
const Core = require('./models/core');
const Crew = require('./models/crew');
const Dragon = require('./models/dragon');
const Rocket = require('./models/rocket');
const Ship = require('./models/ship');

// Helper Functions
const fetchDataAll = async (Model, res) => {
    Model.find({}, (error, items)=>{
        console.log(error?error:items)
        res.json(items)
    })
}
const fetchDataOne = (Model, _id, res) => {
    Model.findOne({ _id }, (error, item) => {
        console.log(error?error:item)
        res.json(item)
    })
}

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
// Capsule
app.get('/capsule', (req,res)=>{
    fetchDataAll(Capsule, res)
})
app.get('/capsule/:id', (req, res) => {
    let _id = req.params.id;
    fetchDataOne(Capsule, _id, res);
})
// Core
app.get('/core', (req,res)=>{
    fetchDataAll(Core, res)
})
app.get('/core/:id', (req, res) => {
    let _id = req.params.id;
    fetchDataOne(Core, _id, res);
})
// Crew
app.get('/crew', (req,res)=>{
    fetchDataAll(Crew, res)
})
app.get('/crew/:id', (req, res) => {
    let _id = req.params.id;
    fetchDataOne(Crew, _id, res);
})
// Dragon
app.get('/dragon', (req,res)=>{
    fetchDataAll(Dragon, res)
})
app.get('/dragon/:id', (req, res) => {
    let _id = req.params.id;
    fetchDataOne(Dragon, _id, res);
})
// Rocket
app.get('/rocket', (req,res)=>{
    fetchDataAll(Rocket, res)
})
app.get('/rocket/:id', (req, res) => {
    let _id = req.params.id;
    fetchDataOne(Rocket, _id, res);
})
// Ship
app.get('/ship', (req,res)=>{
    fetchDataAll(Ship, res)
})
app.get('/ship/:id', (req, res) => {
    let _id = req.params.id;
    fetchDataOne(Ship, _id, res);
})

app.put('/roadster/:id/edit', (req,res)=>{
    let _id = req.params.id;
    let name = req.body.name;
    const updateRoadster = async (_id, name) => {
        Roadster.findOneAndUpdate({_id}, {name}, {new:true}, (error, roadster)=>{
            console.log(`${error?error:roadster}`)
            res.redirect(`/roadster/${_id}`);
        });
    }
    updateRoadster(_id, name);
})
app.listen(PORT, ()=>{
    console.log(`🎧Listening on ${PORT}`)
})