import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS重置

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // 全局css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // 权限控制
import Pagination from "@/components/Pagination";
import permission from './directive/permission'
import Web3 from 'web3'
import { getToken } from '@/utils/auth'
import echarts from 'echarts'
import { parseTime,resetForm,downloadBlob,urlBlob } from "@/utils/index";
import '@/utils/directives'
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.downloadBlob = downloadBlob
Vue.prototype.urlBlob = urlBlob
Vue.prototype.getToken = getToken
Vue.prototype.$echarts = echarts
Vue.prototype.$Web3 = Web3
/**

 *如果不想使用模拟服务器

 *您想将MockJs用于mock api

 *您可以执行：mockxhr（）

 *目前MockJs将用于生产环境，

 *请在联机前将其删除! !

 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
// 全局组件挂载
Vue.component('Pagination', Pagination)
//设置全局权限
Vue.use(permission)
// 设置语言
Vue.use(ElementUI/*, { locale }*/)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  'el': '#app',
  router,
  store,
  'render': h => h(App)
})
