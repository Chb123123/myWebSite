<template>
  <router-view />
</template>

<script>
// 导入字体
import '@/assets/fonts/fonts.css'
// 站酷仓耳渔阳体
// import '@/assets/fonts1/fonts.css'
// ZCOOL XiaoWei
// import '@/assets/fonts2/fonts.css'
export default {}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  // 设置字体为自定义字体
  font-family: 'AliMaMa';
  // 站酷仓耳渔阳体
  // font-family: 'Version';
  // ZCOOL XiaoWei
  // font-family: 'ZCOOL', sans-serif;
  font-display: swap;
}
ul,
li {
  list-style: none;
}
div {
  box-sizing: border-box;
}
input {
  outline: none;
}
div::-webkit-scrollbar {
  width: 4px;
}
div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 1);
  opacity: 0.7;
}
div::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
}
</style>
