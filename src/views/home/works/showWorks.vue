<template>
  <div class="main_container">
    <!-- <el-row :gutter="20">
      <el-col :span="12" v-for="item in worksList" :key="item.id">
        <div class="worksItem" @click="getWorkInfo(item)">
          <div class="worksTitle">{{ item.worksTitle }}</div>
        </div>
      </el-col>
    </el-row> -->
    <div class="box">
      <ClockTemp></ClockTemp>
    </div>
  </div>
</template>

<script>
import ClockTemp from '@/components/clock/index.vue'
import { getAllWorks, getUserWorks } from '@/api/worksApi.js'
export default {
  name: 'myWorks',
  components: {
    ClockTemp
  },
  data() {
    return {
      worksList: []
    }
  },
  methods: {
    // 获取所有作品列表
    async getWorksList() {
      try {
        const res = await getAllWorks(0, 5)
        if (res.data.status === 1) {
          this.worksList = res.data.queryData
          console.log(this.worksList)
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取用户发布的作品列表
    async getUserWorksList() {
      try {
        const res = await getUserWorks(0, 5)
        if (res.data.status === 1) {
          console.log(res.data)
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    getWorkInfo(info) {
      console.log(info)
      // 新增一个页面, 指向获取的链接
      // window.open(info.wordsAddress)
    }
  },
  created() {
    this.getWorksList()
    // this.getUserWorksList()
  }
}
</script>

<style lang="less" scoped>
.main_container {
  height: 600px;
  width: 1200px;
  margin:100px auto 0;
  // border: 1px solid #ccc;
  .worksItem {
    display: flex;
    flex-direction: column;
    // align-items: center;
    height: 150px;
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.5s;
    padding-top: 50px;
    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .worksTitle {
      height: 40px;
      width: 100%;
      border: 1px solid #ccc;
      line-height: 40px;
      padding: 0 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      word-wrap: normal;
      font-size: 28px;
    }
  }
  .box {
    height: 300px;
    width: 300px;
    // background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
