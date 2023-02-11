const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistsschema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,

    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
    // numOfItems: 0,
  },
  { timestamps: true }
);
module.exports = mongoose.model('Playlist', playlistsschema);
