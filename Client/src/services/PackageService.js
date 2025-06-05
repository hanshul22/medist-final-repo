
import requests from "./httpService";

const PackageService = {

    getPackage: async () => {
        return requests.get(`/package`);
    },
    getPackageSearch: async (query) => {
        // console.log("query",query)
        return requests.get(`/package/search?title=${query}`);
    },
    getPackageById: async (id) => {
        return requests.get(`/package/${id}`);
    },
    getWebPackageByCategory: async (id) => {
        return requests.get(`/package/category/${id}`);
    },
    getWebPackage: async () => {
        return requests.get(`/package/web`);
    },
    getPopularPackage: async () => {
        return requests.get(`/package/web/popular`);
    },
    updatePackage: async (id, body) => {
        return requests.patch(`/package/${id}`, body);
    },

    createPackage: async (body) => {

        return requests.post(`/package`, body);
    },
    deletePackage: async (id) => {
        return requests.delete(`/package/${id}`);
    },

}

export default PackageService;