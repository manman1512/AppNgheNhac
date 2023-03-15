const express = require('express');
const http = require('http');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const middleware = require('./middleware');

const songRouter = require('./routes/song.route')
const userRouter = require('./routes/user.route')
const authRouter = require('./routes/auth.route');
const playListRoute = require('./routes/playlist.route');
const artistsRouter = require('./routes/artist.route');
const loveSongRouter = require('./routes/loveSong.route')

const multer = require('multer');
const path = require('path');

const userModel = require("./models/user.model")

const app = express();
const server = http.createServer(app);

const MONGO_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 2023;

(async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('Connect database successfully!');
    } catch (error) {
      console.log(error);
    }
  })();

  console.log(path.join(__dirname, 'images'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: '*',
    })
  );

  app.use(express.static('public'));
  app.use('/images', express.static(path.join(__dirname, '/images')));
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images');
    },
    filename: (req, file, cb) => {
      // const name = req.body.name.replaceAll(' ', '%20');
      // console.log(name);
      cb(null, req.body.name);
      // req.body = name;
    },
  });

  const upload = multer({ storage: storage });

  app.use('/api/auth', authRouter)
  app.use('/api/songs', songRouter)
  app.use(middleware);
  // app.post('/api/upload', upload.single('file'), async (req, res) => {
  //   try {
  //     const { _id } = req.user;
  //     const { name } = req.body;
  //     const user = await userModel.findById(_id);
  //     if (user) {
  //       user.images.push(name);
  //       await user.save();
  //       res.status(200).json({ success: true, image: name });
  //     } else {
  //       res.status(404).json({ success: false, message: 'User khong ton tai!' });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json(error);
  //   }
  // });

  app.post('/api/upload/avatar', upload.single('file'), async (req, res) => {
    try {
      const { _id } = req.user;
      const { name } = req.body;
      const user = await userModel.findById(_id);
      if (user) {
        user.profilePic = name;
        await user.save();
        res.status(200).json({ success: true, image: name });
      } else {
        res.status(404).json({ success: false, message: 'User khong ton tai!' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });
  
  app.use('/api/users', userRouter)
  app.use('/api/playlists', playListRoute)
  app.use('/api/artists', artistsRouter)
  app.use('/api/loveSongs', loveSongRouter)


  server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });