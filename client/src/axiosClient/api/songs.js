import axiosClient from '../index';

const songsApi = {
  getHome: async () => {
    return await axiosClient.get('/songs/getHome');
  },

  getSong: async (data) => {
    return await axiosClient.get('/songs/getSong' + data);
  },

  getAllSong: async () => {
    return await axiosClient.get('/songs/getAllSong');

  },
  getLinkSong: async (songId) => {
    return await axiosClient.get(`/songs/getSongMP3/${songId}`)
  },
  searchSongs: async(title) => {
    return await axiosClient.get("/songs/search", {
      params: {
        title,
        take: 5
      }
    })
  }
};

export default songsApi;
