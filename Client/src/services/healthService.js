import requests from "./httpService";

const HealthService = {

    getService : async () =>{
        return requests.get(`/service`);
    },
    getWebService : async () =>{
        return requests.get(`/service/web`);
    },
    updateService : async (id,body) =>{
        return requests.patch(`/service/${id}`,body);
    },
    getServiceById : async (id) =>{
        // console.log("id",id)
        return requests.get(`/service/${id}`);
    },
    createService : async (body) =>{
   
        return requests.post(`/service`,body);
    },
    deleteService : async (id) =>{
        return requests.delete(`/service/${id}`);
    }
    , 
    

}

export default HealthService;