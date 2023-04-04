import axiosClient from '../index';

const loveSongApi = {
  getLoveSongByUser: async () => {
    return await axiosClient.get('/loveSongs/getLoveSongByUser');
  },
  handleLoveSongById: async (data) => {
    return await axiosClient.post('/loveSongs/handleLoveSongById/' + data);
  },
  deleteLoveSongById: async (data) =>{
    return await axiosClient.delete('/loveSongs/deleteLoveSongById/' + data)
  },
};

export default loveSongApi;
