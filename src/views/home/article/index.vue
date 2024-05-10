<template>
  <div class="mainContainer">
    <div class="title">
      <el-input v-model="title" placeholder="请输入文章标题"></el-input>
    </div>
    <Editor id="tinymce" v-model="myValue" :init="init"></Editor>
    <div class="submitBox">
      <el-button size="small" type="primary" style="margin: 0 20px" @click="releaseArticle"
        >发布文章</el-button
      >
      <el-button size="small" type="info" style="margin: 0 20px" @click="cancelRelease"
        >取消编辑</el-button
      >
    </div>
  </div>
</template>

<script>
import { uploadArticle } from '@/api/homeViewApi'
import tinymce from 'tinymce/tinymce' // tinymce默认hidden，
import Editor from '@tinymce/tinymce-vue' // 编辑器引入
import 'tinymce/themes/silver/theme' // 编辑器主题
import 'tinymce/icons/default' // 引入编辑器图标icon
import 'tinymce/models/dom/model'
import 'tinymce/plugins/advlist' // 高级列表
import 'tinymce/plugins/autolink' // 自动链接
import 'tinymce/plugins/link' // 超链接
import 'tinymce/plugins/image' // 插入编辑图片
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/charmap' // 特殊字符
import 'tinymce/plugins/media' // 插入编辑媒体
import 'tinymce/plugins/wordcount' // 字数统计
import 'tinymce/plugins/table'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/preview'
export default {
  name: 'myArticle',
  components: {
    Editor
  },
  data() {
    return {
      myValue: '',
      userInfo: {},
      title: '',
      init: {
        selector: '#tinymce',
        language_url: '/static/zh_CN.js', // 汉化路径是自定义的，一般放在public或static里面
        language: 'zh_CN',
        skin_url: '/static/skins/ui/oxide', // 皮肤
        plugins:
          'advlist autolink link image lists charmap table fullscreen preview', // 插件
        content_css: '/static/skins/content/document/content.css',
        // 富文本工具栏
        toolbar:
          'undo redo |  formatselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent lists image | fullscreen | preview',
        fontsize_formats:
          '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', // 字体大小
        height: '80vh', // 高度
        min_height: '400px',
        placeholder: '文章内容',
        branding: false, // 隐藏右下角技术支持
        images_upload_url: `${this.$baseUrl}/my/upload/img`
        // images_upload_handler: async(blobInfo, successFun) => {
        //   const file = blobInfo.blob()
        //   const { data } = await uploadImg(file)
        //   successFun(data.data)
        // }
      }
    }
  },
  tokenInfo() {
    return {
      authorization: localStorage.getItem('webiteToken')
    }
  },
  methods: {
    async releaseArticle() {
      if (this.myValue === '') return this.$message('文章内容不能为空！')
      try {
        const res = await uploadArticle(
          this.userInfo.userId,
          this.myValue,
          this.title
        )
        if (res.data.status === 1) {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          // 跳转到首页
          this.$router.push('/home')
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    cancelRelease() {
      this.$confirm('退出编辑将不保存输入的数据, 是否继续?', '退出编辑', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/home')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已退出'
          })
        })
    }
  },
  mounted() {
    tinymce.init({})
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('myWebiteUser'))
  }
}
</script>

<style lang="scss" scoped>
.mainContainer {
  width: 100%;
  height: 100vh;
  border: 1px solid #ccc;
  padding: 20px;
}
.title {
  height: 50px;
  font-size: 26px;
  width: 100%;
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
  /deep/.el-input__inner {
    text-align: center;
  }
}
.submitBox {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
