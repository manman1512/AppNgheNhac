import axiosClient from "../index";

const playlistsApi = {
    getDetailPlaylist: async (data) =>{
        return await axiosClient.get("/playlists/getDetailPlaylist" + data)
    }
}

export default playlistsApi;