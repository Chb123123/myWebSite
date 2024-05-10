<template>
  <svg :class="['svg-icon', className]" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style scoped lang="scss">
.svg-icon {
  width: 10rem;
  height: 10rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
