<template>
  <div class="mainContainer" v-loading="loading">
    <el-dialog
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
    </div>
  </div>
</template>

<script>
import {
  getUserInfo,
  getUserIndex,
  getTableInfo,
  upDataSignature,
  updataUserPic
} from '@/api/userInfoApi'
export default {
  name: 'userAbout',
  data() {
    return {
      loading: false,
      imageUrl: '',
      userInfo: {},
      localUser: {},
      newIndex: 0,
      srcList: [],
      labelList: [],
      dialogVisible: false
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
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('myWebiteUser'))
    if (!user) {
      this.$router.push('/login')
    }
    this.localUser = user
    this.getUser(user.userId, user.accountNumber)
  }
}
</script>

<style lang="less">
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
</style>
