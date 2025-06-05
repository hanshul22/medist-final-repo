import requests from "./httpService";

const CategoryService = {

    getCat : async () =>{
        return requests.get(`/cat`);
    },
    getWebCat : async () =>{
        return requests.get(`/cat/web`);
    },
    updateCat : async (id,body) =>{
        return requests.patch(`/cat/${id}`,body);
    },

    createCat : async (body) =>{
   
        return requests.post(`/cat`,body);
    },
    deleteCat : async (id) =>{
        return requests.delete(`/cat/${id}`);
    }, 

}

export default CategoryService;