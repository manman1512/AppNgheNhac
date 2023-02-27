import axiosClient from "../index";

const usersApi = {
    getMe: async () =>{
        return await axiosClient.get("/users/getMe")
    },

}

export default usersApi;