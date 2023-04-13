<template>
  <div class="mainBox">
    <el-space direction="vertical" alignment="flex-start">
      <el-skeleton style="width: 100%" :loading="loading" animated>
        <template #template>
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in 12" :key="item"
              ><el-skeleton-item
                variant="image"
                style="width: 100%; height: 240px" />
              <div style="padding: 14px">
                <el-skeleton-item variant="h3" style="width: 50%" />
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                    margin-top: 16px;
                    height: 16px;
                  "
                >
                  <el-skeleton-item variant="text" style="margin-right: 16px" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                </div></div
            ></el-col>
          </el-row>
        </template>
        <template #default>
          <el-card :body-style="{ padding: '0px', marginBottom: '1px' }">
            <el-row :gutter="20">
              <el-col :span="6" v-for="item in imgList" :key="item.id"
                ><img :src="item.url" style="width: 100%; height: 240px" />
                <div style="padding: 14px">
                  <el-skeleton-item variant="h3" style="width: 50%" />
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-items: space-between;
                      margin-top: 16px;
                      height: 16px;
                    "
                  >
                    <el-skeleton-item
                      variant="text"
                      style="margin-right: 16px"
                    />
                    <el-skeleton-item variant="text" style="width: 30%" />
                  </div></div
              ></el-col>
            </el-row>
          </el-card>
        </template>
      </el-skeleton>
    </el-space>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'imageList',
  data() {
    return {
      loading: true,
      imgList: [],
      total: 0
    }
  },
  created() {
    this.getInfoData()
  },
  methods: {
    getInfoData() {
      this.loading = true
      axios({
        url: 'https://api.apiopen.top/api/getImages',
        params: {
          responseType: 'blob',
          type: '',
          page: 0,
          size: 16
        }
      }).then((res) => {
        this.loading = false
        if (res.data.code === 200) {
          console.log(res.data.result)
          this.imgList = res.data.result.list
          this.total = res.data.result.total
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.mainBox {
  width: 100vw;
  padding: 20px 50px;
  height: 100vh;
  border: 1px solid #ccc;
  overflow: auto;
}
</style>
