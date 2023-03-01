const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    displayName: {
      type: String
    },
    password: {
      type: String,
      require: true,
    },
    passwordConfirm: {
      type: String,
      require: true,
    },
    profilePic: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    images:[
      {
        type: String,
      }
    ],
    playList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist"
      }
    ],
    loveSong: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "songs"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
