// const { ZingMp3 } = require('zingmp3-api-full');
// const fs = require('fs');
// const path = require('path');

// function storeToFile(fileName, data){
//     const dir = path.join(__dirname, "data", fileName);
//     return fs.writeFileSync(dir, JSON.stringify(data));
// }
// async function getArtistSong(artistId){
    
//     const response = await ZingMp3.getListArtistSong(artistId, 1 ,15);
//     if(response.msg === "Success"){
//         const data = response.data;
//         if(data && data.items)
//         return data.items.map((item)=>( {
//             id: item.encodeId,
//             name: item.title,
//             artist: artistId
//         }))
//         else
//             return []
//     }else{
//         return [];
//     }   
// }
// async function getDetailSong(song){
//     const response = await ZingMp3.getInfoSong(song.id);
//     if(response.msg === "Success"){
//         const {data} = response;
//         const link = await ZingMp3.getSong(data.encodeId);
//         if(link.msg === "Success"){
//             return  {
//                 id: data.encodeId,
//                 name: data.title,
//                 thumbnail: data.thumbnail,
//                 link: link.data["128"]

//             }
//         }
//     }


// }
// async function getArtist(listArtistName){
//     const artists = await Promise.all(listArtistName.map(async(artist)=>{
//         const response = await ZingMp3.getArtist(artist);
//         console.log(response);
//         if(response.msg === "Success"){
//             const data = response.data;
//             const songs = await getArtistSong(data.id);
//             setTimeout(async ()=>{
//                 const xxx = await Promise.all(songs.map(async (song)=>{
//                     return await getDetailSong(song)
//                 }));
//                 fs.writeFileSync(path.join(__dirname,"data", `${data.id}.json`), JSON.stringify(xxx));
//             },30000)
//             return {
//                 id: data.id,
//                 name: data.name,
//                 cover: data.cover,
//                 thumbnail: data.thumbnail
//             }
//         }
//         return null;
//     }))
//     const _ = artists.filter((art)=> art !== null);
//     storeToFile("artist.json", _);
//     return _;
// }

// ( async ()=>{
//     const response = await ZingMp3.getHome();
//     const {items} = response.data;
//     let listPlaylist = []
//     let listArtistName = [];
//     items.forEach((item)=>{
//         if(item.sectionType === "new-release"){
//             const artists = item.items.all.map(i => {
//                 const artists = i.artists;
//                 return artists.map(artist => artist.name.replaceAll(" ", "-"));
//             })
//             listArtistName.push(...artists);
//         }
//         if(item.sectionType === "playlist"){
//             listPlaylist = item.items.map(i => i.encodeId);
//             item.items.forEach(i=>{
//                 i.artists.forEach(artist =>{
//                     const name = artist.name.replaceAll(" ", "-")
//                     !listArtistName.includes(name) && listArtistName.push(name);
//                 })
//             })
//         }
//     })
//     await getArtist(listArtistName);
//     // console.log(l[0]);
// })()