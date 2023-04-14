import axiosClient from "../index";

const usersApi = {
    getMe: async () =>{
        return await axiosClient.get("/users/getMe")
    },

    // update: async (data) =>{
    //     return await axiosClient.put("/users/update", data)
    // },

    updateAvatar: (formData)=>{
        return new Promise(async (resolve,reject)=>{
            try{
                const response = await axiosClient.post("/upload/avatar", formData);
                resolve(response);
            }catch(error){
                reject(error);
            }
        })

    },
}

export default usersApi;