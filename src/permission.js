import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ 'showSpinner': false }) //进度条显示

const whiteList = ['/'] // 在免登录白名单，直接进入

router.beforeEach(async(to, from, next) => {
  // 进度条
  NProgress.start()
  // 设置标题
  document.title = getPageTitle(to.meta.title)
  // 用户是否登进
  const hasToken = getToken()
  if (hasToken) {
    next();
  } else {
    // 无token情况
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // 否则全部重定向到登录页
      next(`/`);
    }
  }
});

router.afterEach(() => {
  // 结束Progress
  NProgress.done()
});
