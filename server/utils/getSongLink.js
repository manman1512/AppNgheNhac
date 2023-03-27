const {ZingMp3} = require("zingmp3-api-full");
const artistModel = require("../models/artist.model");
async function getLink(id){
    // console.log(song)
    const response = await ZingMp3.getSong(id);
    const link = response.data["128"];
    return link
}
async function getSongLink(listSong){
    const songs = await Promise.all(listSong.map(async(song) => {
        const artist = await artistModel.findById(song.artist);
        const newLink = await getLink(song.id);
        const newData = {
            _id: song._id,
            id: song.id,
            thumbnail: song.thumbnail,
            name: song.name,
            artist: artist,
            link: newLink
        }
        return newData;
    }))
    return songs

}
// async function getSongLinkWithArtist({_id, id, artist}){
//     const songs = 

// }

module.exports = {getSongLink}