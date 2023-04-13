<template>
  <div class="mainContainer">
    <div class="title">标题</div>
    <Editor id="tinymce" v-model="myValue" :init="init"></Editor>
    <div class="submitBox">
      <el-button type="primary" style="margin: 0 20px">发布文章</el-button>
      <el-button type="info" style="margin: 0 20px">取消编辑</el-button>
    </div>
  </div>
</template>

<script>
// import { uploadSingleImg } from '@/api/homeViewApi'

import tinymce from 'tinymce/tinymce' // tinymce默认hidden，
import Editor from '@tinymce/tinymce-vue' // 编辑器引入
import 'tinymce/themes/silver/theme' // 编辑器主题
import 'tinymce/icons/default' // 引入编辑器图标icon
import 'tinymce/models/dom/model'

// import 'tinymce/plugins/textcolor' // 颜色
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
// import 'tinymce/plugins/imagetools'
export default {
  name: 'myArticle',
  components: {
    Editor
  },
  data() {
    return {
      myValue: '',
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
        placeholder: '在这里输入内容',
        branding: false, // 隐藏右下角技术支持
        images_upload_handler: (blobInfo, success, failure) => {
          // 默认插入base64方式
          // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          // success(img)
          console.log(blobInfo, '1')
          // eslint-disable-next-line camelcase
          // 上传的图片类型
          // eslint-disable-next-line camelcase
          const file_type = blobInfo.blob().type
          console.log(file_type)
          const name = (blobInfo.filename && blobInfo.filename()) || blobInfo.blob().name
          // 格式校验 判断上传的文件类型是否是图片
          const isAccept =
            // eslint-disable-next-line camelcase
            file_type === 'image/jpeg' ||
            // eslint-disable-next-line camelcase
            file_type === 'image/png' ||
            // eslint-disable-next-line camelcase
            file_type === 'image/GIF' ||
            // eslint-disable-next-line camelcase
            file_type === 'image/jpg' ||
            // eslint-disable-next-line camelcase
            file_type === 'image/BMP'
          // 大小校验
          if (blobInfo.blob().size / 1024 / 1024 > 3) {
            this.$message('上传失败，图片大小请控制在 3M 以内')
          } else if (!isAccept) {
            this.$message('图片格式错误')
          } else {
            // 上传
            const formData = new FormData()
            // 服务端接收文件的参数名，文件数据，文件名
            formData.append('文件参数', blobInfo.blob(), name)
            console.log(formData)
            // const res = uploadSingleImg(formData)
            // .then((result) => {
            //   // 这里返回的是你图片的地址
            //   success(result.url)
            // })
            // .catch(() => {
            //   failure('上传失败')
            // })
            // console.log(res)
          }
        }
      }
    }
  },
  methods: {
    uploadImg() {}
  },
  mounted() {
    tinymce.init({})
  }
}
</script>

<style lang="less" scoped>
.mainContainer {
  width: 100%;
  height: 100vh;
  border: 1px solid #ccc;
}
.title {
  height: 50px;
  font-size: 26px;
  width: 100%;
  text-align: center;
  line-height: 50px;
}
.submitBox {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
