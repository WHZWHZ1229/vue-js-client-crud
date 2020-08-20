<template>
  <div v-show="show" class="div-center transition-box">
    <transition name="el-zoom-in-top">
      <el-card class="box-card" shadow="always">
        <p align="center">
          Welcome to the Leave Application System<br/>
        </p>
        <p>
          Please note that:
        </p>
        <ul>
          <li>
            Leave applications should be submitted to your supervisor for approval, and should follow the relevant leave <a target="_blank" rel="noopener noreferrer" href="https://www.ab.ust.hk/hro/AdminDoc/leave/index.html">policies and regulations</a>.
          </li>
          <li>
            Click <a target="_blank" rel="noopener noreferrer" href="https://w5.ab.ust.hk/cgi-bin/stf_cgi.sh/WService=broker_la_p/prg/la_leave_type_win.r">here</a> for the types of leave that can be processed on the web.   For other types of leave, click <a target="_blank" rel="noopener noreferrer" href="https://www.ab.ust.hk/hro/Forms/form.html#5">here</a> to download the relevant application forms.
          </li>
          <li>
            The approving authority will receive up to ten notifications of leave applications a day.   For urgent cases, applicants should contact the approving authority direct to expedite action.
          </li>
          <li>
            If you have questions/comments, please contact Human Resources Office at <a href="mailto:hrstaffq@ust.hk">hrstaffq@ust.hk</a> or Information Systems Office at <a href="mailto:issupprt@ust.hk">hrstaffq@ust.hk</a>.
          </li>
        </ul>
      </el-card>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LeaveIntro",
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
  }
}
</script>

<style scoped>
.div-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-card {
  margin-top: 100px;
  width: 600px;
}
</style>