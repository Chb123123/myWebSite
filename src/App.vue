<template>
  <router-view />
</template>

<script>
export default {

}
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  ul, li {
    list-style: none;
  }
  div {
    box-sizing: border-box;
  }
  input{
    outline:none;
  }
  div::-webkit-scrollbar {
    width: 4px;
  }
  div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    opacity: 0.2;
  }
  div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
  }
</style>
