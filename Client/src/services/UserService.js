import requests from "./httpService";

const UserService = {

    getUser : async () =>{
        return requests.get(`/user`);
    },
    updateUser : async (id,body) =>{
        return requests.patch(`/user/${id}`,body);
    },

    createUser : async (body) =>{
   
        return requests.post(`/user`,body);
    },
    deleteUser : async (id) =>{
        return requests.delete(`/user/${id}`);
    }, 
    getUserReport : async () =>{
        return requests.get(`/user/report`);
    },
    updateUserReport : async (id,body) =>{
        return requests.patch(`/user/report/${id}`,body);
    },

    createUserReport : async (body) =>{
   
        return requests.post(`/user/report`,body);
    },
    deleteUserReport : async (id) =>{
        return requests.delete(`/user/report/${id}`);
    }, 
    

}

export default UserService;