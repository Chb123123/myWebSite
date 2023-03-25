<template>
  <div class="container">
    <div class="introduction">
      <div class="left">
        <div class="personal">
          <div class="HeadPortrait">
            <img src="@/assets/header1.jpg" alt="">
          </div>
          <span>Cai-HuaiBin</span>
          <span>唯有落叶知秋意</span>
        </div>
        <div v-for="(item, index) in labelList" :key="item.id" :class="newIndex === index? 'labelItem labelItemStyle':'labelItem'" @click="taggerCarousel(index)">
          <i :class="item.icon" :style="'margin-right: 10px; color:' + item.color "></i>{{item.text}}
        </div>
      </div>

      <div class="right">
        <el-carousel :interval="3000" :autoplay="false" arrow="always" :initial-index="newIndex" direction="vertical" indicator-position="none" style="width: 100%; height: 100%;" @change="taggerCarousel">
          <el-carousel-item v-for="item in 6" :key="item">
            <div class="content"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getUserIndex, getTableInfo, upDataSignature } from '@/api/userInfoApi'
export default {
  name: 'myHome',
  data () {
    return {
      userInfo: {},
      labelList: [], // table列表
      // 当前焦点图索引
      newIndex: 0
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async taggerCarousel (index) {
      console.log(this.labelList[index])
      this.newIndex = index
      const res = await getTableInfo(this.labelList[index].text)
      console.log(res)
      if (res.data.status === 0) {
        this.$message(res.data.message)
      }
    },

    // 获取用户数据
    async getUser () {
      // 获取用户数据
      const res = await getUserInfo()
      console.log(res)
      if (res.data.status === 1) {
        this.userInfo = res.data.queryData
      } else {
        this.$message(res.data.message)
      }
      // 获取首页 table 栏列表
      const tabList = await getUserIndex()
      if (res.data.status === 1) {
        this.labelList = tabList.data.queryData
      } else {
        this.$message(res.data.message)
      }
    },
    // 修改签名
    async signature (id, str) {
      const res = await upDataSignature(id, str)
      console.log(res)
      if (res.data.status === 1) {
        console.log(res)
      } else {
        this.$message(res.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    position: relative;
    width: 100vw;
    height: 100vh;
    // background-color: red;
    background-image: url('@/assets/bz1.jpg');
    background-size: 100% 100%;
    .introduction{
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
      .left{
        flex: 0.3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        background-color: rgba(255,255,255,0.5);
        // 头像
        .personal{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 30%;
          width: 100%;
          border-radius: 30px;
          background-color: #E1DDDC;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          .HeadPortrait{
            // width: 30em;
            // height: 30em;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 6em;
            height: 6em;
            border-radius: 50%;
            overflow: hidden;
            // border: 1px solid #000;
            > img{
              width: 100%;
              height: 60%;
            }
          }
          > span {
              font-weight: 600;
              color: #7290B0;
              margin-top: 5px;
            }
        }
        .labelItem{
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
        .labelItem:hover{
            color: #fff;
          }
        .labelItemStyle{
          // background-color: #B0B9C0;
          color: #fff;
          // box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
      }
      .right{
        flex: 0.65;
        // position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        overflow: hidden;
        background-color: rgba(255,255,255,0.5);
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
        .content{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;
        }
      }
    }
  }
  /deep/.el-carousel__container{
    // display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
  }
  .el-carousel__item:nth-child(1) {
    background-color: #2A67CC;
    opacity: 0.7;
  }
  .el-carousel__item:nth-child(2) {
    background-color: #FCBC30;
    opacity: 0.7;
  }
  .el-carousel__item:nth-child(3) {
    background-color: #4EFDFD;
    opacity: 0.7;
  }
  .el-carousel__item:nth-child(4) {
    background-color: #F14D40;
    opacity: 0.7;
  }
  .el-carousel__item:nth-child(5) {
    background-color: #07BC1C;
    opacity: 0.7;
  }
  .el-carousel__item:nth-child(6) {
    background-color: #94A9FD;
    opacity: 0.7;
  }
</style>
