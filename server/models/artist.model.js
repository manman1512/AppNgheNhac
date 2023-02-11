const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistsSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  cover: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
});
module.exports = mongoose.model("artists", artistsSchema);