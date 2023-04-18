<template>
  <div class="container">
    <el-collapse-transition>
      <div class="headerTable" v-show="showHeader">
        <!-- <div class="webiteTitle">个 人 网 站</div> -->
        <div class="headerNav">
          <ul>
            <li
              v-for="item in navList"
              :key="item.id"
              @click="gotoView(item.id)"
              :style="item.id === navIndex ? 'color: #5e8fd4' : ''"
            >
              {{ item.title }}
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
    <div style="height: 1000px"></div>
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
      <div class="newsText"></div>
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
      navList: [
        {
          id: 0,
          title: '首页'
        },
        {
          id: 1,
          title: '查看图片'
        },
        {
          id: 2,
          title: '个人详情'
        },
        {
          id: 3,
          title: '网页设置'
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
        this.srcList.push(this.userInfo.user_pic)
      } else {
        this.$message(res.data.message)
      }
    },
    gotoView(id) {
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
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  // overflow: auto;
  // background-color: red;
  background-image: url('@/assets/bg.jpg');
  background-size: 100% 100%;
  .headerTable {
    display: flex;
    justify-content: space-between;
    // align-content: center;
    align-items: center;
    width: 100vw;
    height: 70px;
    padding: 0 40px;
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
      justify-content: center;
      margin-right: 150px;
      // background-color: red;
      > ul {
        width: 600px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > li {
          flex: 1;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          // background-color: red;
          &:hover {
            color: #5e8fd4;
            transition: all 0.4s;
          }
        }
      }
    }
    .userPic {
      width: 60px;
      height: 60px;
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
  .focusMap {
    // margin: 30px;
    height: 450px;
    width: 100%;
    margin: 30px auto 0;
    padding: 0 100px;
    display: flex;
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
      // background-color: gold;
    }
  }
}
/deep/.el-carousel__container {
  // display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
}
</style>
