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

const path = require('path');

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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use('/api/auth', authRouter)
  app.use('/api/songs', songRouter)
  app.use(middleware);
  app.use('/api/users', userRouter)
  app.use('/api/playlists', playListRoute)
  app.use('/api/artists', artistsRouter)
  app.use('/api/loveSongs', loveSongRouter)


  server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });