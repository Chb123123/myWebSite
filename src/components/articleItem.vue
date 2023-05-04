<template>
  <div class="mian-box">
    <div v-for="(item, index) in articleList" :key="index">
      <solt name="body" :row="item" :index="index"></solt>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleItem',
  props: {
    articleList: {
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
      type: Array
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.mian-box {
  width: 100%;
}
</style>
