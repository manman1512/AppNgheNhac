import axiosClient from "../index"

const loveSongApi = {
    getLoveSongByUser: async () =>{
        return await axiosClient.get("/loveSongs/getLoveSongByUser")
    }
}

export default loveSongApi;