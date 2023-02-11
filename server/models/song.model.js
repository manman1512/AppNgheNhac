const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songsSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  link: {
    type: String,
  },
  artist:
    {
        type: Schema.Types.ObjectId,
        ref: "artists"
    }
});
module.exports = mongoose.model("songs", songsSchema);
