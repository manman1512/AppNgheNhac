// const dotenv = require("dotenv");
// const fs = require("fs");
// const { default: mongoose } = require("mongoose");
// const path = require("path");
// const artists = require("./data/artist.json");
// const artistModel = require("./models/artist.model");
// const songModel = require("./models/song.model");
// // console.log(artists);
// dotenv.config();
// const MONGO_URI = process.env.ATLAS_URI;

// async function insertArtist(info){
//     const exist = await artistModel.findOne({
//         id: info.id
//     })
//     if(exist){
//         const {id, ...data} = exist;
//         await artistModel.updateOne({
//             id: id
//         }, info)
//         return exist;
//     }else{
//         const artist = new artistModel({
//             ...info
//         })
//         await artist.save();
//         return artist;
//     }
// }
// async function insertSong(info){
//     const song = new songModel(info);
//     await song.save();

// }
// (async()=>{
//     await mongoose.connect(MONGO_URI);
//     console.log("Connect database successfully!!!!!");
//     for(let artist of artists){
//         console.log(artist);
//         const result = await insertArtist(artist);
//         console.log(result);
//         const artistSongs = fs.readFileSync(path.join(__dirname,"data", `${result.id}.json`), "utf-8");
//         const songs = JSON.parse(artistSongs);
//         console.log(songs);
//         // await Promise.all(songs.filter(s => s !== null).map((song)=> insertSong({
//         //     ...song,
//         //     artist: result._id
//         // })))
//     }
//     console.log("Insert data success!!");
//     mongoose.disconnect();
// })()