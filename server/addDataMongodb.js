const dotenv = require("dotenv");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const path = require("path");
const artists = require("./data/artist.json");
const artistModel = require("./models/artist.model");
const songModel = require("./models/song.model");
// console.log(artists);
dotenv.config();
const MONGO_URI = process.env.ATLAS_URI;

async function insertArtist(info){
    // console.log(info);
    const artist = new artistModel({
        ...info
    })
    // console.log("🚀 ~ file: addDataMongodb.js:11 ~ insertArtist ~ artist", artist)
    await artist.save();
    return artist;
}
async function insertSong(info){
    const song = new songModel(info);
    await song.save();

}
(async()=>{
    await mongoose.connect(MONGO_URI);
    console.log("Connect database successfully!!!!!");
    // insert artists;
    for(let artist of artists){
        const result = await insertArtist(artist);
        const artistSongs = fs.readFileSync(path.join(__dirname,"data", `${result.id}.json`), "utf-8");
        const songs = JSON.parse(artistSongs);
        await Promise.all(songs.filter(s => s !== null).map((song)=> insertSong({
            ...song,
            artist: result._id
        })))
    }
    console.log("Insert data success!!");
    mongoose.disconnect();
})()