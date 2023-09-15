<template>
  <div class="main_container">
    <div class="content">
      <div class="box">
        <ClockTemp></ClockTemp>
        <div class="rightBox">
          <span style="font-size: 60px">{{ nowTime }}</span>
          <span style="font-size: 28px">{{ nowDate }}</span>
          <span style="font-size: 28px">{{ nowWeek }}</span>
        </div>
      </div>
      <div class="box1"></div>
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
      worksList: [],
      nowDate: '', // 当前日期
      nowTime: '', // 当前时间
      nowWeek: '' // 当前星期
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
    },
    currentTime() {
      setInterval(this.getDate, 1000)
    },
    getDate() {
      const _this = this
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const week = new Date().getDay()
      const hh = new Date().getHours()
      const mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      const second =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
      if (week === 1) {
        this.nowWeek = '星期一'
      } else if (week === 2) {
        this.nowWeek = '星期二'
      } else if (week === 3) {
        this.nowWeek = '星期三'
      } else if (week === 4) {
        this.nowWeek = '星期四'
      } else if (week === 5) {
        this.nowWeek = '星期五'
      } else if (week === 6) {
        this.nowWeek = '星期六'
      } else {
        this.nowWeek = '星期日'
      }
      _this.nowTime = hh + ':' + mf + ':' + second
      _this.nowDate = yy + '年' + mm + '月' + dd + '日'
    }
  },
  created() {
    this.currentTime()
    this.getWorksList()
    // this.getUserWorksList()
  },
  beforeDestroy() {
    if (this.getDate) {
      console.log('销毁定时器')
      clearInterval(this.getDate) // 在Vue实例销毁前，清除时间定时器
    }
  }
}
</script>

<style lang="less" scoped>
.main_container {
  height: 100vh;
  width: 100%;
  background: url(http://127.0.0.1/images/viewsImg/1681725536144.jpg);
  background-size: 100% 100%;
  padding: 100px 0 0 100px;
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
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  .content {
    height: 400px;
    width: 470px;
    // letter-spacing: 0.5em;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    padding: 20px 10px;
  }
  .box {
    position: relative;
    height: 250px;
    width: 450px;
    display: flex;
    // justify-content: center;
    align-items: center;
    padding: 0 20px;
    border-radius: 20px;
    z-index: 10;
    margin-bottom: 15px;
    background-color: rgba(255, 255, 255, 0.6);
  }
  .rightBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    flex: 1;
    height: 100%;
    // border: 1px solid #ccc;
    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 25%;
      margin: 5px 0;
      // border: 1px solid #ccc;
      color: #fff;
    }
  }
  .box1 {
    display: flex;
    align-items: center;
    padding: 0 20px;
    width: 450px;
    height: 100px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
  }
}
</style>
