import http from "../http-common";

class TutorialDataService {
    // getAll() {
    //     return http.get("/tutorials");
    // }
    //
    // get(id) {
    //     return http.get(`/tutorials/${id}`);
    // }
    //
    // create(data) {
    //     return http.post("/tutorials", data);
    // }
    //
    // update(id, data) {
    //     return http.put(`/tutorials/${id}`, data);
    // }
    //
    // delete(id) {
    //     return http.delete(`/tutorials/${id}`);
    // }
    //
    // deleteAll() {
    //     return http.delete(`/tutorials`);
    // }
    //
    // findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    // }

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
}

export default new TutorialDataService();
