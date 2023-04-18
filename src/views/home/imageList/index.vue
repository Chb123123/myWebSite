<template>
  <div class="mainBox">
    <vueWaterfallEasy
      ref="waterfall"
      :imgsArr="imgList"
      @scrollReachBottom="getInfoData"
      srcKey="url"
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
      imgList: [],
      total: 0,
      page: 0
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
      const res = await getViewImages(this.page, 30)
      console.log(res.data)
      if (res.data.status === 1) {
        res.data.queryData.results.forEach(item => {
          item.url = `${this.$baseUrl}${item.url}`
        })
      }
      this.imgList = [...this.imgList, ...res.data.queryData.results]
    }
  }
}
</script>

<style scoped lang="less">
.mainBox {
  width: 100vw;
  padding: 20px 0;
  height: 100vh;
  overflow: auto;
}
</style>
