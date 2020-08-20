<template>
  <div class="login-background-div">
    <div class="div-center">
        <el-card class="box-card" shadow="always">
          <el-image
              style="margin-bottom: 40px"
              :src="url"></el-image>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">Sign in</el-button>
            </el-form-item>
          </el-form>
        </el-card>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "Login",
  data() {
    return {
      url: require('../assets/hkust_logo.png'),
      ruleForm: {
        name: '',
        password: '',
      },
      userInfo:{
        name: '',
        password: '',
      },
      rules: {
        name: [
          {required: true, message: 'Please input User name', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please input Password', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var user = {
            username:this.ruleForm.name,
            password:this.ruleForm.password
          }
          TutorialDataService.login(user)
              .then(response => {
            console.log(response.data);
            if(response.data.ret_code === 0) {
              this.$parent.activeIndex = '5'
              this.$router.push('/')
              this.$root.userInfo = user.username
            }
            else{
              this.$alert(response.data.ret_msg, 'Alert', {
                confirmButtonText: 'OK',
              });
            }
          }).catch(e => {
            console.log(e);});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    console.log("login userInfo "+this.$root.userInfo)
  }
}
</script>

<style scoped>
.box-card {
  margin-top: 100px;
  width: 600px;
}

.div-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-background-div {
  width: 100%;
  height: 100%;
}

.el-button--primary {
  color: #fff;
  background-color: #0A3282;
  border-color: #0A3282;
}
.el-button--primary:hover {
  color: #fff;
  background-color: #1548AD;
  border-color: #1548AD;
}
.el-button--primary:focus {
  color: #fff;
  background-color: #1548AD;
  border-color: #1548AD;
}

</style>