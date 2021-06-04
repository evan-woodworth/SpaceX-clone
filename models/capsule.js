const mongoose = require('mongoose');

const capsuleSchema = new mongoose.Schema({
    "serial": {
      "type": "String",
      "required": true,
      "unique": true,
    },
    "status": {
      "type": "String",
      "enum": ["unknown", "active", "retired", "destroyed"],
      "required": true,
    },
    "type": {
      "type": "String",
      "enum": ["Dragon 1.0", "Dragon 1.1", "Dragon 2.0"],
      "required": true,
    },
    "reuse_count": {
      "type": "Number",
      "default": 0,
    },
    "water_landings": {
      "type": "Number",
      "default": 0,
    },
    "land_landings": {
      "type": "Number",
      "default": 0,
    },
    "last_update": {
      "type": "String",
      "default": null,
    }
  })

capsuleSchema.methods.intro = ()=>{
    console.log(`The capsule name is ${this.name}`);
}

const Capsule = mongoose.model('Capsule', capsuleSchema);
module.exports = Capsule;