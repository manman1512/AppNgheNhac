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
};

export default songsApi;
