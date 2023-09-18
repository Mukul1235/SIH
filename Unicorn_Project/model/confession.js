const { Schema, model } = require("mongoose");

const ConfessSchema = Schema({
  confession_no: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  emojis: {
    type: Number,
    required: true,
  },
  confessedOn:{
    type:String,
  }
},{timeStamps:true});

module.exports.Confession = model("Confession", ConfessSchema);
