<template>
  <div class="mainBox">
    <div class="mainTitle animate__animated animate__fadeIn animate__delay-1s">
      <!-- <span class="title">欢迎来到我的网站</span> -->
      <button class="btn" @click="clickBtn">进入网页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainViews',
  methods: {
    clickBtn() {
      console.log(localStorage.getItem('webiteToken'))
      if (!localStorage.getItem('webiteToken')) {
        this.$message('未登入, 前往登入页面')
        this.$router.replace('/login')
      } else {
        this.$router.replace('/home')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mainBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  // background-image: url('@/assets/002105-1666196465196d.jpg');
  background-size: 100% 100%;
  .mainTitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 300px;
    .title {
      height: 50px;
      font-size: 34px;
      color: #fff;
    }
  }
}
.btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 230px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 24px;
  text-transform: uppercase;
  cursor: pointer;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 10px;
  border: 0;
  opacity: 0.6;
}

.btn:hover {
  animation: animate 8s linear infinite;
  opacity: 1;
}

@keyframes animate {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}

.btn::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 40px;
  opacity: 0;
  transition: 0.5s;
}

.btn:hover::before {
  filter: blur(20px);
  opacity: 1;
  animation: animate 8s linear infinite;
}
</style>
