import requests from "./httpService";

const TestimonialService = {

    getTestimonial : async () =>{
        return requests.get(`/testi`);
    },
    getWebTestimonial : async () =>{
        return requests.get(`/testi/web`);
    },
    updateTestimonial : async (id,body) =>{
        return requests.patch(`/testi/${id}`,body);
    },

    createTestimonial : async (body) =>{
   
        return requests.post(`/testi`,body);
    },
    deleteTestimonial : async (id) =>{
        return requests.delete(`/testi/${id}`);
    }, 

}

export default TestimonialService;