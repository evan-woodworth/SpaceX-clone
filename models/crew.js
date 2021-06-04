const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
  "name": {
    "type": "String",
    "default": null
  },
  "status": {
    "type": "String",
    "required": true,
    "enum": ["active", "inactive", "retired", "unknown"]
  },
  "agency": {
    "type": "String",
    "default": null
  },
  "image": {
    "type": "String",
    "default": null
  },
  "wikipedia": {
    "type": "String",
    "default": null
  }
})

crewSchema.methods.intro = ()=>{
    console.log(`The Crew name is ${this.name}`);
}

const Crew = mongoose.model('Crew', crewSchema);
module.exports = Crew;