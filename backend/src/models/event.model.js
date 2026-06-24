const mongoose = require('mongoose');

// Define the Events Schema
const EventsSchema = new mongoose.Schema({
    image: String,
    startedAt: String,
    endsAt:String,
    name: String,
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    location: String,
});

module.exports= Event;

// Define and export the Events model