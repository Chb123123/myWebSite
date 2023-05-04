<template>
  <div class="container">
    <el-collapse-transition>
      <div class="headerTable" v-show="showHeader">
        <!-- <div class="webiteTitle">个 人 网 站</div> -->
        <div class="headerNav">
          <ul>
            <li>
              <span>退出登入</span>
            </li>
          </ul>
        </div>
        <div class="userPic">
          <el-image
            class="userPicImg"
            style="width: 100%; height: 100%"
            :src="userInfo.user_pic"
            :preview-src-list="srcList"
          >
          </el-image>
        </div>
      </div>
    </el-collapse-transition>
    <div class="headerImg"></div>
    <!-- 焦点图 -->
    <div class="focusMap">
      <div class="mapList">
        <el-carousel height="450px">
          <el-carousel-item v-for="item in fouceMap" :key="item.id">
            <div class="mapItem">
              <img :src="item.imgUrl" alt="" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="newsText">
        <div class="userInfo">
          <div class="user_pic">
            <el-image
              style="width: 100%; height: 100%"
              :src="userInfo.user_pic"
              :preview-src-list="srcList"
            ></el-image>
          </div>
          <div class="userNameStyle">
            <span style="width: 80px">昵称：</span>
            <div class="userContent">{{ userInfo.userName }}</div>
          </div>
          <div class="signatureStyle">
            <span style="width: 80px">签名：</span>
            <div class="signatureContent">{{ userInfo.user_signature }}</div>
          </div>
        </div>
        <div class="aboutInfo">详情页面</div>
      </div>
    </div>
    <div class="moduleList">
      <div
        class="moduleItem"
        v-for="item in navList"
        :key="item.id"
        @click="gotoView(item.id)"
      >
        <div class="module">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFouseMapList } from '@/api/homeViewApi'
import { getUserInfo } from '@/api/userInfoApi'
export default {
  name: 'myHome',
  data() {
    return {
      userInfo: {},
      labelList: [], // table列表
      navIndex: 0,
      // 当前焦点图索引
      newIndex: 0,
      srcList: [],
      // 焦点图列表
      fouceMap: [],
      showHeader: true,
      scrollHeight: 0,
      scrollFalg: true,
      canvasDom: null,
      navList: [
        {
          id: 1,
          title: '图片欣赏'
        },
        {
          id: 3,
          title: '文章发布'
        },
        {
          id: 4,
          title: '网站收集'
        },
        {
          id: 2,
          title: '个人详情'
        }
      ]
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('myWebiteUser'))
    this.getUser(user.userId, user.accountNumber)
    this.getFouseMap(user.userId)
  },
  methods: {
    async getUser(userId, accountNumber) {
      const res = await getUserInfo(userId, accountNumber)
      if (res.data.status === 1) {
        this.userInfo = res.data.queryData
        console.log(this.userInfo)
        this.srcList.push(this.userInfo.user_pic)
      } else {
        this.$message(res.data.message)
      }
    },
    gotoView(id) {
      this.navIndex = id
      switch (id) {
        case 0:
          this.$router.push('/home')
          break
        case 1:
          this.$router.push('/imageList')
          break
        case 2:
          this.$router.push('/user')
          break
        case 3:
          console.log('网页设置')
          break
        case 5:
          // 删除本地token
          localStorage.removeItem('myWebiteUser')
          this.$router.replace('/login')
          break
      }
    },
    // 获取轮播图列表
    async getFouseMap(id) {
      const res = await getFouseMapList(id)
      if (res.data.status !== 1) return this.$message('获取轮播图失败')
      this.fouceMap = res.data.queryData
    },
    handleScroll() {
      if (this.scrollFalg) {
        clearTimeout(this.scrollFalg)
      }
      this.scrollFalg = setTimeout(() => {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        console.log(scrollTop, '滚动距离')
      }, 100)
    }
  },
  mounted() {
    this.canvasDom = document.getElementById('canvas_sakura')
    console.log(this.canvasDom)
    if (this.canvasDom) {
      this.canvasDom.style.display = 'none'
    }
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #06070c;
  // background-image: url('@/assets/233711-1680190631eeea.jpg');
  background-size: 100% 100%;
  overflow: auto;
  .headerTable {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    // align-content: center;
    align-items: center;
    width: 100vw;
    height: 70px;
    padding: 0 20px;
    background-color: rgba(0, 0, 0, 0.3);
    .webiteTitle {
      width: 200px;
      height: 70px;
      line-height: 70px;
      font-size: 30px;
      color: white;
      font-weight: 600;
      text-shadow: 0 0 5px;
    }
    .headerNav {
      flex: 1;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: end;
      // margin-right: 150px;
      // background-color: red;
      > ul {
        width: 800px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: end;
        > li {
          flex: 1;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: end;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          // background-color: red;
          &:hover {
            color: #5e8fd4;
            transition: all 0.4s;
          }
          .fontStyle {
            background-color: #fff;
            padding: 5px 20px;
            border-radius: 20px;
            color: #333;
          }
        }
      }
    }
    .userPic {
      width: 60px;
      height: 60px;
      margin-left: 20px;
      background-color: red;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: 3px solid #fff;
      > .userPicImg {
        // width: 100%;
        // height: 100%;
        width: 120%;
        height: 120%;
        &:hover {
          transform: scale(1.2);
          transition: all 0.3s;
        }
      }
    }
  }
  .headerImg {
    height: 650px;
    width: 100%;
    // background-image: url('@/assets/1681784069253.jpg');
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(0, 0, 0, 0) 100%
      ),
      url('@/assets/1681784069253.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .focusMap {
    height: 450px;
    width: 80vw;
    margin: 30px auto 0;
    display: flex;
    // border: 2px solid #ccc;
    margin-top: -250px;
    .mapList {
      // width: 100%;
      flex: 0.4;
      overflow: hidden;
      border-radius: 20px;
      // background-color: #2A67CC;
      .mapItem {
        width: 100%;
        height: 100%;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .newsText {
      flex: 0.6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 20px;
      > .userInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex: 0.4;
        border-radius: 20px;
        margin-right: 20px;
        border: 1px solid #34373f;
        background-color: #16191e;
        .user_pic {
          height: 120px;
          width: 120px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #ccc;
        }
        .userNameStyle {
          display: flex;
          margin-top: 20px;
          width: 80%;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          color: #fff;
          .userContent {
            padding-left: 10px;
            width: 100%;
            height: 100%;
            border-bottom: 1px solid #fff;
          }
        }
        .signatureStyle {
          display: flex;
          margin-top: 20px;
          width: 80%;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          color: #fff;
          .signatureContent {
            padding-left: 10px;
            width: 100%;
            height: 100%;
            border-bottom: 1px solid #fff;
            // border: 1px solid #fff;
          }
        }
      }
      > .aboutInfo {
        height: 100%;
        flex: 0.6;
        border: 1px solid #34373f;
        background-color: #16191e;
        border-radius: 20px;
      }
    }
  }
  .moduleList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    margin: 40px auto 30px;
    // border: 1px solid #ccc;
    width: 80vw;
    > .moduleItem {
      flex: 0.2;
      cursor: pointer;
      height: 100%;
      border: 1px solid #34373f;
      background-color: #16191e;
      border-radius: 20px;
      overflow: hidden;
      .module {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url('@/assets/154519-150986791987f6.jpg');
        background-size: 100% 100%;
        transition: all 1s;
        font-size: 24px;
        color: #fff;
        &:hover {
          transform: scale(1.3);
        }
      }
    }
  }
  .articleList {
    width: 80vw;
    margin: 20px auto;
    // background-color: #fff;
    border-radius: 30px;
  }
}
/deep/.el-carousel__container {
  // display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
}
/deep/#canvas_sakura {
  display: none;
}
</style>
