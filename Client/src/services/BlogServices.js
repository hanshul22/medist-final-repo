import requests from "./httpService";

const BlogService = {

    getBlog : async () =>{
        return requests.get(`/blog`);
    },
    getWebBlog : async () =>{
        return requests.get(`/blog/web`);
    },
    updateBlog : async (id,body) =>{
        return requests.patch(`/blog/${id}`,body);
    },
    getBlogBySlug : async (slug) =>{
        // console.log(slug)
        return requests.get(`/blog/slug/${slug}`);
    },
    createBlog : async (body) =>{
   
        return requests.post(`/blog`,body);
    },
    deleteBlog : async (id) =>{
        return requests.delete(`/blog/${id}`);
    }
}

export default BlogService;