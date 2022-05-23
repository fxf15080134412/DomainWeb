import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  'baseURL': process.env.VUE_APP_BASE_API, // url = base url + request url
  'timeout': 10000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
    config => {
      // 请求前拦截
      if (store.getters.token) {
        // 让每个请求携带自定义token
        config.headers['Authorization'] = 'Bearer '+ getToken();
        config.headers['Client-Name'] = 'hro-web';
        config.headers['Client-Version'] = '1.0.0';
      }
      return config
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
)
// response 拦截器
service.interceptors.response.use(
    /**
     * 如果想要获取诸如头或状态之类的http信息
     * 请返回response=>response
     */

    /**
     * 通过自定义代码确定请求状态
     * 这里只是一个例子
     * 您还可以通过http状态代码判断状态
     */
    response => {
      /**
       * code为非200是抛错
       */
      const res = response
      if(res.data.code !== 200){
        Message.closeAll()
      }
      if (res.data.code === 200) {
        return res.data
      } else if(res.data.code === 401){
        //5:非法的token; 5:其他客户端登录了;  401:Token 过期了;(2019.2.22如有状态后续再加)
        Message({
          message: '登录凭据过期，请重新登录',
          type: 'warning',
          duration: 2 * 1000
        })
        setTimeout(()=>{
          window.location.reload();
        },1500)
      }else if(res.data.code === 403){
        Message({
          message: '您暂无此权限',
          type: 'error',
          duration: 3 * 1000
        })
      }else if(res.data.code === 405){
        Message({
          message: '405',
          type: 'error',
          duration: 3 * 1000
        })
      }else{
        Message({
          message: res.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      if(res.data.code !== 200){
        return Promise.reject('error')
      }
    },
    error => {
      Message.closeAll()
      if(error.response){
        if(error.response.status === 401){
          Message({
            message: '登录凭据过期，请重新登录',
            type: 'warning',
            duration: 2 * 1000
          })
          setTimeout(()=>{
            window.location.reload();
          },1500)
        }else if(error.response.status === 403){
          Message({
            message: '您暂无此权限',
            type: 'warning',
            duration: 3 * 1000
          })
        }else {
          Message({
            message: error.response.data.message?error.response.data.message:error.message,
            type: 'error',
            duration: 3 * 1000
          })
        }
      }else {
        Message({
          message: error.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(error)
    }
)
export default service
