import http from "../http-common";

class TutorialDataService {

    login(user) {
        return http.post("/login", user);
    }

    loadSession(){
        return http.get("/login/session");
    }

    logout(){
        return http.get("/op/logout");
    }

    createLeave(data){
        return http.post("/op/leave-create", data);
    }

    getLeave(data){
        return http.get(`/op/leave-get?applier=${data}`);
    }

    getProcessingLeave(data){
        return http.get(`/op/processing-leave-get?applier=${data}`);
    }

    modifyLeave(data){
        return http.post("/op/leave-modification", data);
    }

    cancelLeave(data){
        return http.post(`/op/cancel-leave`,data);
    }

    getApproveLeave(data){
        return http.get(`/op/approve-leave-get?supervisor=${data}`);
    }

    approveLeave(data){
        return http.post(`/op/approve-leave`,data);
    }

    getRemainDays(data){
        return http.get(`/op/remain-days-get?id=${data}`);
    }
}

export default new TutorialDataService();
