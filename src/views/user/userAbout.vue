<template>
  <div class="mainContainer" v-loading="loading">
    <div class="headerTextContent">
      <div class="headerText">Personal Details</div>
    </div>
    <div class="container">
      <!-- 左侧内容 -->
      <div class="clockContent">
        <div class="box">
          <ClockTemp></ClockTemp>
          <div class="rightBox">
            <span style="font-size: 48px">{{ nowTime }}</span>
            <span style="font-size: 28px">{{ nowDate }}</span>
            <span style="font-size: 28px">{{ nowWeek }}</span>
          </div>
        </div>
        <div class="box1">
          <div class="address">{{ weatherInfo.city }}</div>
          <div class="weatherItem">
            <span>
              <!-- <img
                :src="showSvg(weatherInfo.today.condition)"
                :alt="weatherInfo.today.condition"
                :title="weatherInfo.today.condition"
              /> -->
            </span>
            <!-- <span>今天:{{ showTemperature(weatherInfo.today.temp) }}</span> -->
          </div>
          <div class="weatherItem">
            <span>
              <!-- <img
                :src="showSvg(weatherInfo.tomorrow.condition)"
                :alt="weatherInfo.tomorrow.condition"
                :title="weatherInfo.tomorrow.condition"
              /> -->
            </span>
            <!-- <span>明天:{{ showTemperature(weatherInfo.tomorrow.temp) }}</span> -->
          </div>
          <div class="weatherItem">
            <span>
              <!-- <img
                :src="showSvg(weatherInfo.thirdday.condition)"
                :alt="weatherInfo.thirdday.condition"
                :title="weatherInfo.thirdday.condition"
              /> -->
            </span>
            <!-- <span>后天:{{ showTemperature(weatherInfo.thirdday.temp) }}</span> -->
          </div>
        </div>
      </div>
      <!-- 中间内容 -->
      <div class="centerContent">
        <div class="userInfo">
          <div class="userLeft">
            <img :src="userInfo.user_pic" alt="" />
          </div>
          <div class="userRight">
            <span>内容区</span>
            <span style="font-size: 28px">{{ userInfo.userName }}</span>
            <span class="famousQuote">{{ userInfo.user_signature }}</span>
            <div class="editBtn" @click="updateUserInfo">
              <i class="el-icon-edit-outline"></i>
            </div>
          </div>
        </div>
        <div class="webiteFunction">
          <div class="FunctionHeader">
            <img src="@/assets/userIcon/util.svg" alt="" style="width: 30px; height: 30px;margin-right: 5px;">
            <span>
              网站功能
            </span>
            <div class="headerIcon">
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
          <div class="FunctionContent">
            <span
              ><img src="@/assets/viewIcon/tupian.svg" alt="" />图片鉴赏</span
            >
            <span
              ><img
                src="@/assets/viewIcon/fabuwenzhang.svg"
                alt=""
              />文章发布</span
            >
            <span
              ><img src="@/assets/viewIcon/wangye.svg" alt="" />网站收藏</span
            >
            <span><img src="@/assets/viewIcon/zp.svg" alt="" />作品发布</span>
          </div>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="rightContent">
        <div class="rightTop"></div>
      </div>
    </div>
    <el-dialog
      title="个人资料"
      :visible.sync="dialogVisible"
      width="250"
      :before-close="handleClose"
    >
      <div class="loadBox">
        <el-upload
          class="avatar-uploader"
          :action= "$baseUrl +'/api/uploadUserPic'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="tokenInfo"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import weatherObj from '@/util/weather.js'
import ClockTemp from '@/components/clock/index.vue'
import {
  getUserInfo,
  getUserIndex,
  getTableInfo,
  upDataSignature,
  updataUserPic,
  updataUserInfo
} from '@/api/userInfoApi'
export default {
  name: 'userAbout',
  components: {
    ClockTemp
  },
  data() {
    return {
      loading: false,
      imageUrl: '',
      userInfo: {},
      localUser: {},
      newIndex: 0,
      srcList: [],
      labelList: [],
      dialogVisible: false,
      worksList: [],
      nowDate: '', // 当前日期
      nowTime: '', // 当前时间
      nowWeek: '', // 当前星期
      weatherInfo: {}
    }
  },
  computed: {
    tokenInfo() {
      return {
        authorization: localStorage.getItem('webiteToken')
      }
    },
    showSvg() {
      return function(val) {
        if (weatherObj[val]) {
          return weatherObj[val]
        }
        for (const item in weatherObj) {
          if (val.indexOf(item) !== -1) {
            return weatherObj[item]
          }
        }
        return weatherObj['无']
      }
    },
    // 格式化温度
    showTemperature() {
      return function(str) {
        const list = str.split('~')
        if (list.length === 1) {
          return list[0]
        } else {
          return `${list[0]}°C/${list[1]}°C `
        }
      }
    }
  },
  methods: {
    // 点击修改用户按钮
    updateUserInfo() {
      this.dialogVisible = true
      console.log('修改用户信息按钮')
    },
    async saveUserInfo() {
      try {
        const res = await updataUserInfo()
        if (!res.data.status) {
          this.$message(res.data.message)
        } else {
          this.$message({
            type: 'success',
            message: res.data.message
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    uploadUserPic() {
      console.log('上传头像')
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    async uploadBtn() {
      console.log(this.localUser.userId, this.imageUrl)
      if (this.imageUrl === '') return this.$message('上传的头像不能为空')
      const res = await updataUserPic(this.localUser.userId, this.imageUrl)
      if (res.data.status === 1) {
        this.$message('修改头像成功')
        this.dialogVisible = false
        return this.getUser(this.localUser.userId, this.localUser.accountNumber)
      }
      this.$message({
        type: 'error',
        message: '修改头像失败'
      })
    },
    handleAvatarSuccess(file) {
      if (file.status === 1) {
        this.imageUrl = file.queryData
        this.$message('上传头像成功')
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt5M
    },

    async taggerCarousel(index) {
      console.log(this.labelList[index])
      this.newIndex = index
      const res = await getTableInfo(this.labelList[index].text)
      console.log(res)
      if (res.data.status === 0) {
        this.$message(res.data.message)
      }
    },

    // 获取用户数据
    async getUser(userId, accountNumber) {
      this.loading = true
      // 获取用户数据
      const res = await getUserInfo(userId, accountNumber)
      console.log(res)
      if (res.data.status === 1) {
        this.userInfo = res.data.queryData
        this.srcList.push(this.userInfo.user_pic)
        console.log(this.userInfo)
      } else {
        this.$message(res.data.message)
      }
      this.loading = false
      // 获取首页 table 栏列表
      const tabList = await getUserIndex()
      if (res.data.status === 1) {
        this.labelList = tabList.data.queryData
      } else {
        this.$message(res.data.message)
      }
    },
    // 修改签名
    async signature(id, str) {
      const res = await upDataSignature(id, str)
      console.log(res)
      if (res.data.status === 1) {
        console.log(res)
      } else {
        this.$message(res.data.message)
      }
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
    // getWeather
    // async newWeather() {
    //   try {
    //     const res = await getWeather()
    //     if (res.data.status) {
    //       this.weatherInfo = res.data.data
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('myWebiteUser'))
    if (!user) {
      this.$router.push('/login')
    }
    this.localUser = user
    this.getDate()
    this.currentTime()
    this.getUser(user.userId, user.accountNumber)
    // this.newWeather()
  },
  beforeDestroy() {
    if (this.getDate) {
      clearInterval(this.getDate) // 在Vue实例销毁前，清除时间定时器
    }
  }
}
</script>

<style lang="less" scoped>
.mainContainer {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  background: url(http://127.0.0.1/images/viewsImg/1681725536144.jpg);
  background-size: 100% 100%;
  .headerTextContent {
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 30px;
    height: 120px;
    line-height: 120px;
    width: 700px;
    // border: 1px solid #ccc;
    border-left: 0;
    margin-bottom: 40px;
    border-radius: 0 60px 60px 0;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    // 设置渐变字体
    .headerText {
      height: 64px;
      line-height: 64px;
      background: linear-gradient(
        to top,
        rgb(188, 142, 249) 0%,
        rgba(0, 0, 255, 0.8) 50%,
        rgb(128, 0, 128) 80%
      );
      background-clip: text;
      color: transparent;
      font-size: 64px;
      text-align: center;
      font-weight: 700;
    }
  }
  .container {
    display: flex;
    justify-content: space-between;
    width: 85%;
    height: 100%;
    // border: 1px solid #ccc;
    margin: auto;
    .clockContent {
      padding: 20px 10px;
      height: 400px;
      width: 470px;
      flex: 0.33;
      box-shadow: 0 0 10px rgba(4,4,4,0.4);
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .centerContent {
      flex: 0.33;
      display: flex;
      flex-direction: column;
      align-items: center;
      .userInfo {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        height: 170px;
        padding: 20px 30px 20px;
        border-radius: 20px;
        margin-bottom: 20px;
        box-shadow: 0 0 10px rgba(4,4,4,0.4);
        background-color: rgba(255, 255, 255, 0.4);
        .userLeft {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(4,4,4,0.4);
          height: 120px;
          width: 120px;
          margin-right: 10px;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .userRight {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 120px;
          padding: 10px 0;
          > span {
            color: #fff;
          }
          .famousQuote {
            box-sizing: border-box;
            font-size: 16px;
            // padding-left: 10px;
            height: 30px;
            width: 100%;
            line-height: 30px;
            border-radius: 5px;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.4);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .editBtn {
            position: absolute;
            height: 40px;
            width: 40px;
            text-align: center;
            line-height: 40px;
            top: 0;
            right: 0;
            font-size: 32px;
            color: #fff;
            cursor: pointer;
          }
        }
      }
      .webiteFunction {
        height: 230px;
        width: 100%;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(4,4,4,0.4);
        background-color: rgba(255, 255, 255, 0.4);
        .FunctionHeader {
          position: relative;
          display: flex;
          align-items: center;
          height: 40px;
          font-size: 24px;
          color: #fff;
          width: 100%;
          border-bottom: 1px solid #fff;
          > .headerIcon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 30px;
            color: #fff;
            right: 10px;
          }
        }
        .FunctionContent {
          height: 150px;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding: 20px 0 0;
          justify-content: space-between;
          align-items: center;
          > span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40%;
            height: 50px;
            font-size: 20px;
            line-height: 50px;
            margin: 0 15px;
            border-radius: 5px;
            color: #fff;
            box-shadow: 0 0 10px rgba(3, 3, 3, 0.2);
            background-color: rgba(255, 255, 255, 0.4);
            transition: all 0.7s;
            cursor: pointer;
            &:hover {
              color: #7290b0;
              background-color: #fff;
            }
            > img {
              height: 28px;
              width: 28px;
              margin: 0 10px;
            }
          }
        }
      }
    }
    .rightContent {
      flex: 0.25;
      display: flex;
      flex-direction: column;
      align-items: center;
      .rightTop {
        height: 200px;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 10px rgba(4,4,4,0.4);
      }
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.userContainer {
  width: 100vw;
  height: 100vh;
  background-color: #409eff;
}
.introduction {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  // background-color: rgba(255,255,255,0.5);
  .left {
    flex: 0.3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.5);
    // 头像
    .personal {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 30%;
      width: 100%;
      border-radius: 30px;
      background-color: #e1dddc;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      .HeadPortrait {
        // width: 30em;
        // height: 30em;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6em;
        height: 6em;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        // border: 1px solid #000;
        > img {
          width: 150%;
          height: 150%;
        }
      }
      > span {
        font-weight: 600;
        color: #7290b0;
        margin-top: 5px;
      }
    }
    .labelItem {
      flex: 1;
      width: 100%;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #416594;
      font-size: 20px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.5s;
    }
    .labelItem:hover {
      color: #fff;
    }
    .labelItemStyle {
      // background-color: #B0B9C0;
      color: #fff;
      // box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
  }
  .right {
    flex: 0.65;
    // position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    .content {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
    }
  }
}
// 弹窗样式
.loadBox {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
// ----------------------
.box {
  position: relative;
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-radius: 20px;
  z-index: 10;
  margin-bottom: 15px;
  box-shadow: 0 0 10px rgba(4,4,4,0.4);
  background-color: rgba(255, 255, 255, 0.5);
}
.box1 {
  position: relative;
  display: flex;
  align-items: center;
  height: 150px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(4,4,4,0.4);
  background-color: rgba(255, 255, 255, 0.5);
  > .weatherItem {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0 10px;
    > span {
      color: #fff;
      > img {
        height: 60px;
        width: 60px;
      }
    }
  }
  .address {
    position: absolute;
    height: 30px;
    width: 200px;
    top: 5px;
    left: 5px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
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
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
    color: #fff;
  }
}
</style>
