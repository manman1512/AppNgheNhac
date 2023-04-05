import axiosClient from '../index';

const playlistsApi = {
  // getDetailPlaylist: async (data) =>{
  //     return await axiosClient.get("/playlists/getDetailPlaylist" + data)
  // }
  getPlaylistByUser: async () => {
    return await axiosClient.get('/playlists/getPlaylistByUser');
  },
  getPlaylistById: async (data) => {
    return await axiosClient.get('playlists/getPlaylistById/' + data);
  },

  createPlayList: async (data) => {
    return await axiosClient.post('/playlists/create', data, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },

  deletePlayListById: async (data) => {
    return await axiosClient.delete('playlists/deletePlayListById/' + data);
  },
  updatePlayListById: async (_id, data) => {
    return await axiosClient.patch('/playlists/updatePlayListById/' + _id, data);
  },
};

export default playlistsApi;
