import requests from "./httpService";

const AdminServices = {

    getMyProfile : async () =>{
        return requests.get(`/admin/profile`);
    },
    updateMe : async (body) =>{
        return requests.patch(`/admin/updateMe`,body);
    },
    createAdmin : async (body) =>{
        console.log(body)
        return requests.post(`/admin/`,body);
    },
    updatePassword : async (body) =>{
        return requests.patch(`/admin/change-password`,body);
    },
    dashboard : async () =>{
        return requests.get(`/admin/dashboard`);
    },
    getAllAdmin : async () =>{
        return requests.get(`/admin`);
    },
    updateAdmin: async (id,body) =>{
        return requests.patch(`/admin/${id}`,body);
    },
    deleteAdmin: async (id,body) =>{
        return requests.delete(`/admin/${id}`,body);
    },
    login: async (body) =>{
        return requests.post(`/admin/login`,body);
    },
    getPermissions: async(body) => {
        return requests.get(`/permission/${body}`);
    }

    
}


export default AdminServices;