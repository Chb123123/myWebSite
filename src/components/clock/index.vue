<template>
  <div class="mainBox">
    <canvas
      id="clock"
      :height="clockWidth"
      :width="clockHeight"
      ref="clock"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'showClick',
  props: {
    clockWidth: {
      type: Number,
      default: 150
    },
    clockHeight: {
      type: Number,
      default: 150
    },
    showView: {}
  },
  data() {
    return {
      obj: '',
      ctx: '',
      r: '',
      rem: ''
    }
  },
  created() {
    this.r = this.clockWidth / 2
    this.rem = this.clockWidth / 200
  },
  mounted() {
    this.obj = this.$refs.clock
    this.ctx = this.obj.getContext('2d')
    this.draw()
    setInterval(this.draw, 1000)
  },
  methods: {
    drawBackground() {
      this.ctx.save()
      this.ctx.translate(this.r, this.r)
      this.ctx.beginPath()
      this.ctx.lineWidth = 5 * this.rem
      // 修改边框颜色
      const gr = this.ctx.createRadialGradient(50, 50, 25, 50, 50, 100)
      gr.addColorStop(0, 'rgb(244,100,154)')
      gr.addColorStop(1, 'rgb(0,210,246)')
      // gr.addColorStop(0.7, 'rgb(0,0,246)')
      // gr.addColorStop(0.8, 'rgb(0,210,0)')
      this.ctx.strokeStyle = gr
      // 以0，0为原点，r为半径，0为起始角，2*Math.PI为结束角，顺时针画圆
      this.ctx.arc(0, 0, this.r - this.ctx.lineWidth / 2, 0, 2 * Math.PI, false)
      this.ctx.stroke()
      const hourNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
      this.ctx.font = 18 * this.rem + 'px Arial'
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillStyle = '#fff'
      // 画出1-12的数字
      for (let i = 0; i < hourNumber.length; i++) {
        const rad = ((2 * Math.PI) / 12) * i
        const x = Math.cos(rad) * (this.r - 30 * this.rem)
        const y = Math.sin(rad) * (this.r - 30 * this.rem)
        this.ctx.fillText(hourNumber[i], x, y)
        this.ctx.strokeStyle = '#fff'
      }
      // 画出秒针走动的60个点
      for (let i = 0; i < 60; i++) {
        const rad = ((2 * Math.PI) / 60) * i
        const x = Math.cos(rad) * (this.r - 18 * this.rem)
        const y = Math.sin(rad) * (this.r - 18 * this.rem)
        this.ctx.beginPath()
        if (i % 5 === 0) {
          // 大线段
          this.ctx.fillStyle = gr
          this.ctx.arc(x, y, 2 * this.rem, 0, 2, 2 * Math.PI, false)
        } else {
          this.ctx.fillStyle = gr
          this.ctx.arc(x, y, 2 * this.rem, 0, 2, 2 * Math.PI, false)
        }
        this.ctx.fill()
      }
    },
    // 时钟
    drawHour(hour, minute) {
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.strokeStyle = '#FBEA93'
      const rad = ((2 * Math.PI) / 12) * hour
      const mrad = ((2 * Math.PI) / 12 / 60) * minute
      this.ctx.rotate(rad + mrad)
      this.ctx.lineWidth = 6
      this.ctx.lineCap = 'round'
      this.ctx.moveTo(0, 10 * this.rem)
      this.ctx.lineTo(0, -this.r / 2)
      this.ctx.stroke()
      this.ctx.restore()
    },
    // 分针
    drawMinute(minute) {
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.strokeStyle = '#448EBB'
      const rad = ((2 * Math.PI) / 60) * minute
      this.ctx.rotate(rad)
      this.ctx.lineWidth = 3 * this.rem
      this.ctx.lineCap = 'round'
      this.ctx.moveTo(0, 10)
      this.ctx.lineTo(0, -this.r + 30 * this.rem)
      this.ctx.stroke()
      this.ctx.restore()
    },
    // 秒针
    drawSecond(second) {
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.fillStyle = '#fff'
      const rad = ((2 * Math.PI) / 60) * second
      this.ctx.rotate(rad)
      this.ctx.moveTo(-2, 20 * this.rem)
      this.ctx.lineTo(2, 20 * this.rem)
      this.ctx.lineTo(1, -this.r + 18 * this.rem)
      this.ctx.lineTo(-1, -this.r + 18 * this.rem)
      this.ctx.fill()
      this.ctx.restore()
    },
    // 中心点
    drawDot() {
      this.ctx.beginPath()
      this.ctx.fillStyle = '#fff'
      this.ctx.arc(0, 0, 3 * this.rem, 0, 2 * Math.PI, false)
      this.ctx.fill()
    },
    // 开始执行
    draw() {
      this.ctx.clearRect(0, 0, this.clockWidth, this.clockHeight)
      const now = new Date()
      const hour = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      this.drawBackground()
      this.drawHour(hour, minutes)
      this.drawMinute(minutes)
      this.drawSecond(seconds)
      this.drawDot()
      this.ctx.restore()
    }
  }
}
</script>
