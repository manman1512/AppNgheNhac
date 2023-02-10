import axiosClient from "../index"

const songsApi = {
    getHome: async () =>{
        return await axiosClient.get("/songs/getHome")
    },

    getSong: async (data) =>{
        return await axiosClient.get("/songs/getSong" + data)
    },

}

export default songsApi;