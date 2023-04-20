<template>
  <div class="mainContainer">
    <div class="box animate__animated animate__slideInDown">
      <!-- <h1 class="logoTitle">
      {{ title }}
    </h1> -->
      <div class="loginForm">
        <div
          :class="className"
          style="width: 100%; height: 100%; position: relative"
        >
          <div class="registerBox">
            <h3 class="boxTitle">S I G N U P</h3>
            <input
              type="text"
              class="inputStyle"
              placeholder="设置账号"
              v-model.trim="setUserName"
            />
            <input
              type="password"
              class="inputStyle"
              placeholder="设置密码"
              v-model.trim="setPassword"
            />
            <input
              type="button"
              value="注 册"
              class="inputBtn"
              style="color: #7ec9ec"
              @click="registerUsreName"
            />
            <el-link
              class="smallBtn"
              type="primary"
              @click="gotoLogin"
              round
              style="color: #fff"
              >已有账号？去登入</el-link
            >
            <div
              class="prompt"
              style="color: red; font-size: 12px"
              v-if="isShowPrompt"
            >
              账号已存在
            </div>
          </div>
          <div class="loginBox">
            <h3 class="boxTitle">S I G N I N</h3>
            <input
              type="text"
              class="inputStyle"
              placeholder="输入账号"
              v-model.trim="accountNumber"
            />
            <input
              type="password"
              class="inputStyle"
              placeholder="输入密码"
              v-model.trim="userPassword"
            />
            <input
              type="button"
              value="登 入"
              class="inputBtn"
              @click="clickLoginBtn"
            />
            <el-link
              class="smallBtn"
              @click="gotoRegister"
              round
              style="color: #fff"
              >暂无账号？去注册</el-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/util/sakura.js'
import { loginModule, registerUser, userIsExist } from '@/api/userInfoApi'
export default {
  name: 'myLogin',
  data() {
    return {
      title: '欢迎',
      className: '',
      accountNumber: 'chb123',
      userPassword: 'chb123456',
      // 注册账号
      setUserName: '',
      setPassword: '',
      flag: true,
      // 是否提示
      isShowPrompt: false
    }
  },
  watch: {
    setUserName(newVal) {
      if (newVal === '') {
        this.isShowPrompt = false
        return
      }
      if (this.flag) {
        clearTimeout(this.flag)
      }
      this.flag = setTimeout(async() => {
        const res = await userIsExist(newVal)
        console.log(res)
        if (res.data.status) {
          this.isShowPrompt = false
        } else {
          this.isShowPrompt = true
        }
      }, 500)
    }
  },
  methods: {
    gotoRegister() {
      this.className = 'animate'
    },
    gotoLogin() {
      this.className = 'animate1'
    },
    // 登入按钮
    async clickLoginBtn() {
      if (this.className === 'animate') return
      if (this.accountNumber === '' || this.userPassword === '') {
        return this.$message('账号或密码不能为空')
      }
      try {
        const res = await loginModule(this.accountNumber, this.userPassword)
        if (res.data.status === 1) {
          // 如果登入成功，则跳转到
          this.$message({
            message: '登入成功',
            type: 'success'
          })
          // 将token存放在本地
          const user = {
            userId: res.data.userId,
            accountNumber: this.accountNumber
          }
          sessionStorage.setItem('webiteToken', res.data.token)
          localStorage.setItem('myWebiteUser', JSON.stringify(user))
          // this.$router.push('/home')
          // 没有缓存的页面跳转
          this.$router.replace('/home')
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 注册功能
    async registerUsreName() {
      if (this.className === 'animate1') return
      if (this.setUserName === '' || this.setPassword === '') {
        return this.$message('用户名或密码不能为空')
      }
      if (this.setUserName.length < 6) {
        return this.$message({ type: 'error', message: '账号长度不能低于六位' })
      }
      if (this.isShowPrompt) {
        return this.$message({
          type: 'error',
          message: '账号已存在，不能有多个相同的账号'
        })
      }
      try {
        const res = await registerUser(this.setUserName, this.setPassword)
        // 注册用户成功
        if (res.data.status === 1) {
          this.$message({
            message: '注册成功,去登入',
            type: 'success'
          })
          this.setPassword = ''
          this.accountNumber = this.setUserName
          this.setUserName = ''
          this.className = 'animate1'
          this.userPassword = ''
        } else {
          this.$message({
            messge: res.data.message,
            type: 'error'
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less">
.mainContainer {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: -webkit-linear-gradient(45deg, #7ec9ec, #ffc6c9);
  background: -o-linear-gradient(45deg, #7ec9ec, #ffc6c9);
  background: -moz-linear-gradient(45deg, #7ec9ec, #ffc6c9);
  background: linear-gradient(45deg, #7ec9ec, #ffc6c9);
}

.box {
  position: relative;
  // border: 1px solid #000;
  height: 800px;
  width: 1200px;
  margin: auto;
}
.logoTitle {
  position: absolute;
  color: #fff;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 45px;
  top: 100px;
  // left: 50%;
  // top: 30%;
  // transform: translateX(-50%);
}
.loginForm {
  position: absolute;
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 500px;
}
// 注册模块
.registerBox {
  display: flex;
  flex-direction: column;
  padding: 0 100px;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #7ec9ec;
  top: 0;
  left: 0;
  transform: rotateY(180deg);
  z-index: 5;
  backface-visibility: hidden;
  border: 1px solid #fff;
  border-radius: 20px;
  transition: all 0.4s;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
    border: 2px solid #fff;
  }
  .smallBtn {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  .prompt {
    position: absolute;
    top: 195px;
    left: 120px;
  }
}
// 登入模块
.loginBox {
  display: flex;
  flex-direction: column;
  padding: 0 100px;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f4c6cc;
  top: 0;
  left: 0;
  z-index: 10;
  backface-visibility: hidden;
  border: 1px solid #fff;
  border-radius: 20px;
  transition: all 0.4s;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
    border: 2px solid #fff;
  }
  .smallBtn {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
.animate {
  animation: flip 0.5s ease 0s 1 normal forwards;
  transform-style: preserve-3d;
  perspective: 300px;
}
.animate1 {
  animation: flipx 0.5s ease 0s 1 normal forwards;
  transform-style: preserve-3d;
  perspective: 300px;
}
@keyframes flipx {
  0% {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
}
@keyframes flip {
  0% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
}
.boxTitle {
  height: 100px;
  width: 100%;
  text-align: center;
  line-height: 100px;
  color: #ffffff;
  font-size: 32px;
  margin-bottom: 30px;
}
.inputStyle {
  height: 60px;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #fff;
  margin-bottom: 30px;
  color: #fff;
  padding-left: 20px;
  font-size: 24px;
  &::-webkit-input-placeholder {
    color: #fff;
  }
}
.inputBtn {
  height: 50px;
  border: 0;
  font-size: 24px;
  margin-top: 20px;
  color: #f4c6cc;
  border-radius: 30px;
  background-color: #fff;
}
</style>
