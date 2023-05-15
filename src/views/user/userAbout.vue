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
            <span style="font-size: 60px">{{ nowTime }}</span>
            <span style="font-size: 28px">{{ nowDate }}</span>
            <span style="font-size: 28px">{{ nowWeek }}</span>
          </div>
        </div>
        <div class="box1"></div>
      </div>
      <!-- 中间内容 -->
      <div class="centerContent"></div>
      <!-- 右侧内容 -->
      <div class="rightContent"></div>
    </div>
    <!-- <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      width="400px"
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadBtn">确 定</el-button>
      </span>
    </el-dialog>

    <div class="userContainer">
      <div class="introduction">
        <div class="left">
          <div class="personal">
            <div class="HeadPortrait" @click="uploadUserPic">
              <img :src="userInfo.user_pic" alt="" />
            </div>
            <span>{{ userInfo.userName }}</span>
            <span>{{ userInfo.user_signature }}</span>
          </div>
          <div
            v-for="(item, index) in labelList"
            :key="item.id"
            :class="
              newIndex === index ? 'labelItem labelItemStyle' : 'labelItem'
            "
            @click="taggerCarousel(index)"
          >
            <i
              :class="item.icon"
              :style="'margin-right: 10px; color:' + item.color"
            ></i
            >{{ item.text }}
          </div>
        </div>

        <div class="right">
          <el-carousel
            :interval="3000"
            :autoplay="false"
            arrow="always"
            :initial-index="newIndex"
            direction="vertical"
            indicator-position="none"
            style="width: 100%; height: 100%"
            @change="taggerCarousel"
          >
            <el-carousel-item v-for="item in 6" :key="item">
              <div class="content"></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import ClockTemp from '@/components/clock/index.vue'
import {
  getUserInfo,
  getUserIndex,
  getTableInfo,
  upDataSignature,
  updataUserPic
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
      nowWeek: '' // 当前星期
    }
  },
  computed: {
    // eslint-disable-next-line vue/no-unused-components
    tokenInfo() {
      return {
        authorization: sessionStorage.getItem('webiteToken')
      }
    }
  },
  methods: {
    uploadUserPic() {
      console.log('上传头像')
      this.dialogVisible = true
    },
    handleClose() {},
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
      if (file.status) {
        this.imageUrl = file.queryData
        console.log(file.queryData)
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
      var _this = this
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
    const user = JSON.parse(localStorage.getItem('myWebiteUser'))
    if (!user) {
      this.$router.push('/login')
    }
    this.localUser = user
    this.currentTime()
    this.getWorksList()
    this.getUser(user.userId, user.accountNumber)
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
    .headerText {
      height: 64px;
      // width: 100px;
      line-height: 64px;
      background: linear-gradient(
        to top,
        rgb(188, 142, 249) 0%,
        rgba(0, 0, 255, 0.8) 50%,
        rgb(128, 0, 128) 80%
      );
      -webkit-background-clip: text;
      color: transparent;
      font-size: 64px;
      text-align: center;
      // text-shadow: 0 0 10px rgba(255,255,255,0.6);
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
      height: 420px;
      width: 470px;
      flex: 0.33;
      // border: 1px solid #ccc;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .centerContent {
      flex: 0.33;
      // height: 420px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .rightContent {
      flex: 0.25;
      // height: 420px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.4);
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
  // background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
// ----------------------
.box {
  position: relative;
  height: 250px;
  width: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  padding: 0 20px;
  border-radius: 20px;
  z-index: 10;
  margin-bottom: 15px;
  background-color: rgba(255, 255, 255, 0.5);
}
.box1 {
  display: flex;
  align-items: center;
  height: 110px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
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
</style>
