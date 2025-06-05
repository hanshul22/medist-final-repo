import requests from "./httpService";

const NotificationService = {

    getNotification : async () =>{
        return requests.get(`/notification`);
    },
    updateNotification : async (id,body) =>{
        return requests.patch(`/notification/${id}`,body);
    },

    createNotification : async (body) =>{
   
        return requests.post(`/notification`,body);
    },
    deleteNotification : async (id) =>{
        return requests.delete(`/notification/${id}`);
    }
    , 
    sendPushNotification : async (body) =>{
      
        return requests.post(`/notification/sendNotification`,body)
    },
    getPushNotification : async () =>{
        return requests.get(`/notification/push`);
    },
    deletePushNotification : async (id) =>{
        return requests.delete(`/notification/push/${id}`);
    }

}

export default NotificationService;