const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistsschema = new Schema(
  {
    key: {
      type: String,
      // required: true,
      // unique: true,
    },
    title: {
      type: String,
      require: true,
      unique: true,
    },
    thumbnail: {
      type: String,
    },
    //   duration: "00:00",
    artists: [],
    //   type: "PLAYLIST",
    //   dateRelease: 0,
    //   dateCreate: 0,
    uploadBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    //   fullName: "Goodmusic4baddays",
    //   avatarUrl: "",
    },
    //   provider: null,
    //   refMapping: [],
    //   genreKey: "",
    //   songs: null,
    //   videos: null,
    //   description: "",
    //   dateModify: "",
    //   listTag: [],
    numOfItems: 0,
  },
  { timestamps: true }
);
module.exports = mongoose.model('Playlist', playlistsschema);
