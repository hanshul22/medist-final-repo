import requests from "./httpService";

const BannerService = {
    getWebsiteBanner: async () =>{
        return requests.get(`/banner/websitebanner`);
    },

    getBanner : async () =>{
        return requests.get(`/banner`);
    },
    updateBanner : async (id,body) =>{
        return requests.patch(`/banner/${id}`,body);
    },

    createBanner : async (body) =>{
   
        return requests.post(`/banner`,body);
    },
    deleteBanner : async (id) =>{
        return requests.delete(`/banner/${id}`);
    }
    , 
    

}

export default BannerService;