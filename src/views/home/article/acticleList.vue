<template>
  <div class="mainContainer">
    <div class="articleItem" v-for="item in articleList" :key="item.articleId">
      <div style="width: 70%" class="articleTitle">
        <el-link
          target="info"
          style="
            font-size: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
          >{{ item.title }}</el-link
        >
      </div>
      <div class="author_pic">
        <img :src="item.user_pic" alt="" />
      </div>
      <div class="time">
        <span>{{ item.userName }}</span>
      </div>
      <div class="author">
        <span style="color: #0b4f7c">{{ item.time }}</span>
      </div>
    </div>
    <div>
      <el-button size="small" type="success" @click="release"
        >发布文章</el-button
      >
    </div>
  </div>
</template>

<script>
import { getUserArticleList } from '@/api/homeViewApi'
export default {
  name: 'articleList',
  data() {
    return {
      user: {},
      articleList: []
    }
  },
  methods: {
    async getIntoData() {
      const res = await getUserArticleList()
      console.log(res.data)
      if (res.data.status) {
        this.articleList = res.data.queryData
      } else {
        this.$message(res.data.message)
      }
    },
    release() {
      this.$router.push('/article')
    }
  },
  created() {
    this.getIntoData()
  }
}
</script>

<style lang="less" scoped>
.mainContainer {
  padding: 20px;
  display: flex;
  width: 100%;
  // width: 500px;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  .articleItem {
    position: relative;
    height: 100px;
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    border: 1px solid #0b4f7c;
    border-radius: 15px;
    cursor: pointer;
    padding-left: 20px;
    align-items: center;
    .author_pic {
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
      height: 80px;
      width: 80px;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        width: 120%;
        height: 120%;
      }
    }
    .articleTitle {
      position: relative;
      display: flex;
      align-items: center;
    }

    .time {
      position: absolute;
      left: 20px;
      top: 5px;
      font-size: 14px;
    }
    .author {
      position: absolute;
      display: flex;
      left: 20px;
      bottom: 5px;
      font-size: 14px;
    }
  }
}
</style>
