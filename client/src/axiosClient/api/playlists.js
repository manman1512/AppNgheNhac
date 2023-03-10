import axiosClient from '../index';

const playlistsApi = {
  // getDetailPlaylist: async (data) =>{
  //     return await axiosClient.get("/playlists/getDetailPlaylist" + data)
  // }
  getPlaylistByUser: async () => {
    return await axiosClient.get('/playlists/getPlaylistByUser');
  },
  createPlayList: async (data) => {
    return await axiosClient.post('/playlists/createPlayList' + data);
  },
};

export default playlistsApi;
