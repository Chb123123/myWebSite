<template>
  <div class="mainBox bgImg">
    <div class="time card">
      <div class="newData">
        <span>{{ newData }}</span>
        <span style="margin-left: 0.5208vw">{{ newWeek }}</span>
      </div>
      <div class="newTime">
        {{ newTime }}
      </div>
    </div>
  </div>
</template>

<script>
import { getHitokoto } from '@/api/utilsApi'
export default {
  data() {
    return {
      time: '',
      newWeek: '',
      newData: '',
      newTime: ''
    }
  },
  created() {
    this.getTimeData()
    this.getFragment()
    // setInterval(() => {
    //   this.getTimeData()
    // }, 1000)
  },
  methods: {
    async getFragment() {
      const res = await getHitokoto()
      console.log(res)
    },
    getTimeData() {
      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth() + 1
      let day = today.getDate()
      let hours = today.getHours()
      let minutes = today.getMinutes()
      let seconds = today.getSeconds()
      let formattedTime =
        year +
        '年' +
        (month < 10 ? '0' : '') +
        month +
        '月' +
        (day < 10 ? '0' : '') +
        day +
        '日 ' +
        (hours < 10 ? '0' : '') +
        hours +
        ':' +
        (minutes < 10 ? '0' : '') +
        minutes +
        ':' +
        (seconds < 10 ? '0' : '') +
        seconds
      let arr = formattedTime.split(' ')
      this.newTime = arr[1]
      this.newData = arr[0]
      this.newWeek = this.getWeek(today.getDay())
      return formattedTime
    },
    getWeek(index) {
      switch (index) {
        case 1:
          return '星期一'
        case 2:
          return '星期二'
        case 3:
          return '星期三'
        case 4:
          return '星期四'
        case 5:
          return '星期五'
        case 6:
          return '星期六'
        case 7:
          return '星期日'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/general.scss';
@import '@/assets/fonts3/fonts.css';
.time {
  margin: 9.26vh auto;
  height: 18.52vh;
  width: 20.8333vw;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bgImg {
  background: url(../../assets/1681784069253.jpg) no-repeat;
  background-size: 100% 100%;
}
.newData {
  font-size: 1.4583vw;
}
.newTime {
  font-family: 'UnidreamLED';
  font-size: 2.9167vw;
  letter-spacing: 0.1em;
}
</style>
