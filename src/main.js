import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import TutorialDataService from "@/services/TutorialDataService";
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale });

TutorialDataService.loadSession().
then(res => {
  console.log("session res")
  console.log(res.data.username)
  new Vue({
    data:{
      userInfo:res.data.username
    },
    router,
    render: h => h(App),
  }).$mount('#app')
}).catch(e => {
  console.log(e);})

