<template>
  <div class="mainBox">
    <!-- <el-dialog
      :title="imgInfo.title"
      :visible.sync="dialogVisible"
      width="900px"
      :before-close="handleClose"
    >
      <div :style="'height:'+imgInfo._height +'px'">
        <img :src="imgInfo.url" :alt="imgInfo.title" style="width: 100%; height: 100%;">
      </div>
    </el-dialog> -->
    <!-- 大图预览 -->
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList" :zIndex="9999"/>
    <div class="headerTitle">
      <span
        :class="imgType === item.type?'titleItem checkTitle':'titleItem'"
        v-for="item in titleList"
        :key="item.id"
        @click="getTitle(item.type)"
        >{{ item.title }}</span
      >
    </div>
    <!-- 瀑布流组件 -->
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
      srcList: [],
      total: 0,
      page: 0,
      show3: true,
      showViewer: false,
      imgType: '',
      imgInfo: '',
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
    vueWaterfallEasy,
    'el-image-viewer': () => import('element-ui/packages/image/src/image-viewer')
  },
  created() {
    this.getInfoData()
  },
  methods: {
    // 获取图片列表
    async getInfoData() {
      this.loading = true
      this.page++
      try {
        const res = await getViewImages(this.page, 30, this.imgType)
        if (res.data.status === 1) {
          res.data.queryData.results.forEach((item) => {
            item.url = `${item.url}`
          })
          this.total = res.data.queryData.total
          this.imgList = [...this.imgList, ...res.data.queryData.results]
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 关闭图片预览
    closeViewer() {
      this.showViewer = false
    },
    // 切换图片标签
    getTitle(type) {
      this.imgType = type
      this.imgList = []
      this.getInfoData()
    },
    // 获取图片详情
    getImgAbout(index, obj) {
      this.imgInfo = obj.value
      if (this.imgInfo.url) {
        this.srcList = [this.imgInfo.url]
      } else {
        this.srcList = []
      }
      this.$nextTick(() => {
        // 显示大图
        this.showViewer = true
      })
      const imgHeight = obj.value._height * 3
      this.imgInfo._height = imgHeight
      // this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
.mainBox {
  width: 100vw;
  padding: 70px 0 0;
  height: 100vh;
  background-color: transparent;
  .headerTitle {
    position: fixed;
    top: 0;
    left: 0;
    // position: sticky; // 粘性定位 当导航栏top为0时固定在顶部
    // top: 0;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 100%;
    font-size: 26px;
    background-color: transparent;
    z-index: 9;
    color: #333;
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
    .checkTitle {
      color: #3640c0;
    }
  }
}
/deep/.el-dialog__body {
  padding: 0;
}
// 图片容器
.imgContent {
  width: 100%;
  border: 1px solid #ccc;
}
</style>
