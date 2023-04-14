import axiosClient from '../index';

const loveSongApi = {
  getLoveSongByUser: async () => {
    return await axiosClient.get('/loveSongs/getLoveSongByUser');
  },
  handleLoveSongById: async (data) => {
    return await axiosClient.post('/loveSongs/handleLoveSongById/' + data);
  },
  handleRemoveLoveSong: async (data) => {
    return await axiosClient.delete("/loveSongs/removeLoveSong", {
      params: {
        songId: data
      }
    })
  }

};

export default loveSongApi;
