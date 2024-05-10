import Vue from 'vue'
// svg组件
import SvgIcon from '@/components/SvgIcon'

// 全局组件注册
Vue.component('SvgIcon', SvgIcon)

// 工程化导入所有 svg 资源（context后面即svg资源放置路径）
const req = require.context('../../assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext)
requireAll(req)
