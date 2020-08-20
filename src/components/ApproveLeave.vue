<template>
  <div class="leave-div">
    <div class="column">
      <transition name="el-zoom-in-top">
        <div v-show="showTable" class="div-center transition-box">
          <el-card class="box-card" shadow="always">
            <p>Supervised Leaves</p>
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
                  <template>
                    <el-popconfirm
                        @onConfirm="approveLeave(scope.$index, tableData)"
                        confirmButtonText='Yes'
                        cancelButtonText='No'
                        icon="el-icon-info"
                        iconColor="red"
                        title="Are you sure to approve this leave application?"
                    >
                      <el-button
                          slot="reference"
                          type="text"
                          style="color:#0A3282"
                          size="small">
                        Approve
                      </el-button>
                    </el-popconfirm>
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                  fixed
                  label="Operation"
                  width="120">
                <template slot-scope="scope">
                  <template>
                    <el-button
                        @click="viewHistory(scope.$index, tableData)"
                        slot="reference"
                        type="text"
                        style="color:#0A3282"
                        size="small">
                      View History
                    </el-button>
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                  prop="applier"
                  label="Applier"
                  width="180">
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
        <div v-show="historyTable" class="div-center transition-box">
          <el-card class="box-card" shadow="always">
            <p>History Of {{ applierOfHistory }}</p>
            <p>Leave Days Remain: {{remainDayOfHistory}}</p>
            <el-table
                highlight-current-row
                :data="historyTableData"
                style="width: 100%"
                height="400">
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
  </div>
</template>

<script>
import TutorialDataService from "@/services/TutorialDataService";

export default {
  name: "ApproveLeave",
  data() {
    return {
      showTable: false,
      submitted: false,
      operationFlag: false,
      tableData: [],
      applierOfHistory: '',
      remainDayOfHistory: '',
      historyTable: false,
      historyTableData: [],
    }
  },
  beforeCreate() {
    TutorialDataService.getApproveLeave(this.$root.userInfo)
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
    viewHistory(index, tableData) {
      console.log("view history")
      this.applierOfHistory = tableData[index].applier
      if (this.historyTable) {
        this.historyTable = false
        console.log(index, tableData)
      }
      TutorialDataService.getLeave(tableData[index].applier)
          .then(leaveResponse => {
            TutorialDataService.getRemainDays(tableData[index].applier)
                .then(response => {
                  if(response.data.ret_code ===0 && leaveResponse.data.ret_code===0) {
                    console.log(response.data);
                    this.remainDayOfHistory = String(response.data.ret_msg.remainDays)
                      this.historyTableData = this.leaveInfoDataFormatter(leaveResponse.data.ret_msg)
                      setTimeout(() => {
                        this.historyTable = true
                      }, 100);
                  }
                }).catch(e => {
              console.log(e);
            });
          }).catch(e => {
        console.log(e);
      });
    },
    showDetail(index, tableData) {
      this.$alert(tableData[index].description, 'Justification')
    },
    approveLeave(index, tableData) {
      console.log(index, tableData)
      TutorialDataService.approveLeave({id: tableData[index].id})
          .then(response => {
            console.log(response.data);
            if (response.data.ret_code === 0) {
              this.tableData.splice(index, 1);
            }
          }).catch(e => {
        console.log(e);
      });
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