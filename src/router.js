import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "LeaveInfoMain",
      component: () => import("./components/LeaveIntro")
    },
    {
      path: "/enquiry-leave",
      name: "LeaveInfo",
      component: () => import("./components/LeaveIntro")
    },
    {
      path: "/modify-leave",
      name: "modifyLeave",
      component: () => import("./components/ModifyLeave")
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
    {
      path: "/delete-leave",
      name: "deleteLeave",
      component: () => import("./components/CancelLeave")
    },
    {
      path: "/approve-leave",
      name: "approveLeave",
      component: () => import("./components/ApproveLeave")
    },
  ]
});
