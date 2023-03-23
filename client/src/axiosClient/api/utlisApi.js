import axiosClient from '..';

const utilsAPi = {
  uploadImage: async (data, onUploadProgress) => {
    return await axiosClient.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress
    });
  },
  getImages: async()=>{
    return await axiosClient.get("/users/getImages");
  }
};
export default utilsAPi;
