<template>
  <div v-if="this.$root.userInfo == null" id="app" class="app-div background-div">
    <Login></Login>
  </div>
  <div v-else id="app_2" class="app-div background-div">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#0A3282"
          text-color="#fff"
          active-text-color="#fff">
        <el-menu-item index="1">Apply Leave</el-menu-item>
        <el-menu-item index="2">Modify Application</el-menu-item>
        <el-menu-item index="3">Cancel Application</el-menu-item>
        <el-menu-item index="4">Leave Approval</el-menu-item>
        <el-menu-item index="5">Leave Information Enquiry</el-menu-item>
        <el-menu-item index="6" @click="logout">Logout</el-menu-item>
      </el-menu>

      <div class="router-div">
        <router-view />
      </div>
  </div>
</template>

<script>
import Login from "@/components/Login";
import TutorialDataService from "./services/TutorialDataService";

export default {
  name: "app",
  components: {Login},
  data() {
    return {
      component:'',
      activeIndex:'1',
    };
  },
  beforeCreate() {
  },
  methods: {
    logout(){
      TutorialDataService.logout()
          .then(response => {
            console.log("logout data")
            console.log(response.data);
            if(response.data.ret_code === 0) {
              this.$router.push('/')
              this.$root.userInfo = null
            }
          }).catch(e => {
        console.log(e);});
    },
    handleSelect(key, keyPath) {
      if(key === "1"){
        this.$router.push('/apply-leave')
        console.log(key);
        console.log(keyPath)
      }
      else if(key === "2"){
        this.$router.push('/add-leave')
        console.log(key);
        console.log(keyPath)
      }
      else if(key === "3"){
        this.$router.push('/delete-leave')
        console.log(key);
        console.log(keyPath)
      }
      else if(key === "4"){
        this.$router.push('/approve-leave')
        console.log(key);
        console.log(keyPath)
      }
      else if(key === "5"){
        this.$router.push('/enquiry-leave')
        console.log(key);
        console.log(keyPath)
      }
    }
  },
  mounted() {
    console.log("userInfo")
    console.log(this.$root.userInfo)
  },
};
</script>

<style>
.app-div{
  /*div to be full screen*/
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
}

.router-div{
  width: 100%;
  height: 90%;
}

.background-div {
  background-image: url("./assets/HKUST.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}


</style>