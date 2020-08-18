import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "applyLeave",
      component: () => import("./components/ApplyLeave")
    },
    // {
    //   path: "/tutorials/:id",
    //   name: "tutorial-details",
    //   component: () => import("./components/Tutorial")
    // },
    // {
    //   path: "/add",
    //   name: "add",
    //   component: () => import("./components/AddTutorial")
    // },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login")
    },
    {
      path: "/login/session",
      name: "session"
    },
    {
      path: "/apply-leave",
      name: "applyLeave",
      component: () => import("./components/ApplyLeave")
    },
  ]
});
