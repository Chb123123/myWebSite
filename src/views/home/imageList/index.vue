<template>
  <div class="mainBox">
    <el-dialog
      title="查看"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div :class="className">
      <span
        class="titleItem"
        v-for="item in titleList"
        :key="item.id"
        @click="getTitle(item.type)"
        >{{ item.title }}</span
      >
    </div>
    <vueWaterfallEasy
      ref="waterfall"
      :imgsArr="imgList"
      @scrollReachBottom="getInfoData"
      :imgWidth="300"
      @click="getImgAbout"
      srcKey="url"
      :reachBottomDistance="50"
    >
    </vueWaterfallEasy>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import { getViewImages } from '@/api/imageView.js'
export default {
  name: 'imageList',
  data() {
    return {
      loading: true,
      dialogVisible: false,
      imgList: [],
      total: 0,
      page: 0,
      show3: true,
      imgType: '',
      className: 'headerTitle',
      titleList: [
        {
          id: 0,
          title: '全部',
          type: ''
        },
        {
          id: 1,
          title: '动物',
          type: 'animal'
        },
        {
          id: 2,
          title: '美',
          type: 'beauty'
        },
        {
          id: 3,
          title: '汽车',
          type: 'car'
        },
        {
          id: 4,
          title: '漫画',
          type: 'comic'
        },
        {
          id: 6,
          title: '游戏',
          type: 'game'
        },
        {
          id: 7,
          title: '电影',
          type: 'movie'
        },
        {
          id: 8,
          title: '人物',
          type: 'person'
        }
      ]
    }
  },
  components: {
    vueWaterfallEasy
  },
  created() {
    this.getInfoData()
  },
  methods: {
    async getInfoData() {
      this.loading = true
      this.page++
      const res = await getViewImages(this.page, 30, this.imgType)
      if (res.data.status === 1) {
        res.data.queryData.results.forEach((item) => {
          item.url = `${this.$baseUrl}${item.url}`
        })
        this.total = res.data.queryData.total
        this.imgList = [...this.imgList, ...res.data.queryData.results]
      } else {
        this.$message({
          type: 'error',
          message: res.data.message
        })
      }
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop < 1000) {
        this.className = 'headerTitle two'
      } else {
        this.className = 'headerTitle one'
      }
    },
    getTitle(type) {
      console.log(type)
      this.imgType = type
      this.imgList = []
      this.getInfoData()
    },
    getImgAbout(index, obj) {
      console.log(obj._height)
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  }
}
</script>

<style scoped lang="less">
.mainBox {
  width: 100vw;
  padding: 70px 0 0;
  height: 100vh;
  .headerTitle {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 100%;
    font-size: 26px;
    background-color: #fff;
    z-index: 999999;
    box-sizing: 0 0 10px rgba(255, 255, 255, 0.7);
    .titleItem {
      width: 120px;
      text-align: center;
      transition: 0.4s all;
      cursor: pointer;
      &:hover {
        color: #3640c0;
      }
    }
  }
}
.one {
  animation: move 1s forwards;
}
.two {
  animation: movey 1s forwards;
}
@keyframes move {
  100% {
    opacity: 0;
  }
}
@keyframes movey {
  100% {
    opacity: 1;
  }
}
</style>
