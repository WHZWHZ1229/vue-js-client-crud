<template>
  <div class="leave-div">
    <div class="column">
      <transition name="el-zoom-in-top">
        <div v-show="showTable"  class="div-center transition-box">
          <el-card class="box-card" shadow="always">
            <p>Processing Leaves</p>
            <el-table
                highlight-current-row
                :data="tableData"
                style="width: 100%"
                height="400">
              <el-table-column
                  fixed
                  label="Operation"
                  width="120">
                <template slot-scope="scope">
                  <el-button
                      @click="showOperation(scope.$index, tableData)"
                      type="text"
                      style="color:#0A3282"
                      size="small">
                    Modify
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                  prop="startAt"
                  label="Start At"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="endAt"
                  label="End At"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="leaveType"
                  label="Leave Type"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="days"
                  label="Days of leaving"
                  width="130">
              </el-table-column>
              <el-table-column
                  prop="supervisor"
                  label="Supervisor"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="processed"
                  label="Processed"
                  width="120">
              </el-table-column>
              <el-table-column
                  label="Justification"
                  width="120">
                <template slot-scope="scope">
                  <el-button
                      @click="showDetail(scope.$index, tableData)"
                      type="text"
                      style="color:#0A3282"
                      size="small">
                    Detail
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </transition>
    </div>
    <div class="column">
      <transition name="el-zoom-in-top">
      <div v-show="operationFlag"  class="div-center transition-box">
        <el-card class="box-card" shadow="always">
          <p>Leave Modification</p>
          <br/>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="Leave Type" prop="leaveType">
              <el-select v-model="ruleForm.leaveType" placeholder="Leave Type">
                <el-option label="Annual Leave" value="Annual Leave"></el-option>
                <el-option label="Sick Leave" value="Sick Leave"></el-option>
                <el-option label="Special Leave" value="Special Leave"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Leave Duration" prop="dateValue" required>
              <el-date-picker
                  v-model="ruleForm.dateValue"
                  type="daterange"
                  start-placeholder="Start date"
                  end-placeholder="End date">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="Days of leaving" prop="daysOfLeave">
              <el-input v-model.number="ruleForm.daysOfLeave" style="width:100px"></el-input>
            </el-form-item>
            <el-form-item label="Supervisor's Email" prop="approvalEmail">
              <el-input v-model.number="ruleForm.approvalEmail" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="Justification" prop="desc">
              <el-input type="textarea" rows="4" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" :disabled="submitted">Confirm</el-button>
              <el-button @click="resetForm('ruleForm')">Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "ModifyLeave",
  data() {
    return {
      showTable:false,
      ruleForm: {
        leaveType: '',
        dateValue: [],
        daysOfLeave: '',
        desc: '',
        approvalEmail: '',
        prevDays:0,
        leaveId:0,
        leavePosition:-1,
      },
      rules: {
        approvalEmail: [
          {required: true, message: 'Please enter supervisor\'s email for approval of the record', trigger: 'change'}
        ],
        leaveType: [
          {required: true, message: 'Please select Leave Type', trigger: 'change'}
        ],
        dateValue: [
          {type: 'array', required: true, message: 'Please pick leave duration'}
        ],
        daysOfLeave: [
          {type: 'number', required: true, message: 'Please enter a number', trigger: 'change'}
        ],
        desc:[
        ]
      },
      submitted: false,
      operationFlag:false,
      tableData: []
    };
  },
  beforeCreate() {
    TutorialDataService.getProcessingLeave(this.$root.userInfo)
        .then(response => {
          console.log(response.data);
          if (response.data.ret_code === 0) {
            this.tableData = this.leaveInfoDataFormatter(response.data.ret_msg)
            this.showTable = true
          }
        }).catch(e => {
      console.log(e);
    });
  },
  methods: {
    dateFormatter(dateData) {
      return dateData.getFullYear() + '-' + (dateData.getMonth() + 1) + '-' + dateData.getDate()
    },
    showDetail(index, tableData) {
      this.$alert(tableData[index].description, 'Justification')
    },
    showOperation(index, tableData) {
      if(this.operationFlag){
        this.operationFlag = false
        console.log(index,tableData)
      }
      this.ruleForm.leaveType = tableData[index].leaveType
      this.ruleForm.daysOfLeave = tableData[index].days
      this.ruleForm.desc = tableData[index].description
      this.ruleForm.approvalEmail = tableData[index].supervisor
      this.ruleForm.dateValue = [tableData[index].startAt,tableData[index].endAt]
      this.ruleForm.prevDays = tableData[index].days
      this.ruleForm.leaveId = tableData[index].id
      this.ruleForm.leavePosition = index
      console.log(typeof(tableData[index].startAt))
      console.log(tableData[index].id)
      setTimeout(() => {  this.operationFlag = true }, 100);
    },
    leaveInfoDataFormatter(data) {
      for (let i = 0; i < data.length; i++) {
        data[i].startAt = data[i].startAt.split("T")[0]
        data[i].endAt = data[i].endAt.split("T")[0]
        if (data[i].processed === 0) {
          data[i].processed = 'false'
        } else {
          data[i].processed = 'true'
        }
      }
      return data
    },
    submitForm(formName) {
      console.log("create page")
      console.log(this.$root.userInfo)
      this.submitted = true;
      this.ruleForm.applier = this.$root.userInfo
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          TutorialDataService.modifyLeave(this.ruleForm).then(response => {
            console.log(response.data);
            this.submitted = false;
            this.$alert(response.data.ret_msg)
            if(response.data.ret_code ===0){
              const LeaveInfoDetail = {
                leaveType: this.ruleForm.leaveType,
                startAt: this.ruleForm.dateValue[0],
                endAt: this.ruleForm.dateValue[1],
                description: this.ruleForm.desc,
                processed: 'false',
                days: this.ruleForm.daysOfLeave,
                supervisor: this.ruleForm.approvalEmail,
                applier: this.ruleForm.applier,
                id:this.ruleForm.leaveId,
              }
              if (this.ruleForm.leavePosition > -1) {
                this.tableData.splice(this.ruleForm.leavePosition, 1);
              }
              this.tableData.unshift(LeaveInfoDetail)
              this.$refs[formName].resetFields();
              this.operationFlag = false
            }
          })
              .catch(e => {
                console.log(e);
              });
        } else {
          this.submitted = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.operationFlag = false
    }
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

.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 100%; /* Should be removed. Only for demonstration */
}

.leave-div {
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