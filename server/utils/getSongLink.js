const {ZingMp3} = require("zingmp3-api-full");
async function getSongLink(listSong){
    const songs = await Promise.all(listSong.map(async (song)=> {
        const response = await ZingMp3.getSong(song.id);
        const link = response.data["128"];
        song.link = link;
        return song;
    }))
    return songs;

}

module.exports = {getSongLink}