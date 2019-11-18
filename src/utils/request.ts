import axios from 'axios'
import qs from 'qs'
import { md5s } from '@/utils/auth'
import Cookies from 'js-cookie'
import { Toast  } from 'vant'
import { setLoading } from '@/store/methods'
// create an axios instance
const service = axios.create({
  // baseURL: 'http://192.168.50.252/api/',
  baseURL: 'http://beifan.400539.com/api/',
  // --md5加密http://gthis.qs110.com/
  transformRequest: [(data: any) => {
    return qs.stringify(md5s(Object.assign({}, data)))
  }],
  // --
  timeout: 5000 // request timeout
})
// console.log(process.env.BASE_API)
// request interceptor
service.interceptors.request.use(
  (config) => {
    // 添加token
    if (Cookies.get('x_tk')) {
      config.headers['X-TOKEN'] = Cookies.get('x_tk')
    }
    // loading
    setLoading(true)
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    setLoading(false)
    // return Promise.reject(response)
    if (response.data.status === 1) {
      return Promise.resolve(response.data)
    } else if (response.data.status === 0) {
      Toast(response.data.message)
      return Promise.reject(response)
    } else {
      // Toast(response.data.message)
      // Cookies.remove('x_tk')
      // window.location.href = 'http://webapp.wdfybj.com/wlhis/index.html'
      return Promise.reject(response)
    }
  },
  (error: any) => {
    setLoading(false)
    // Cookies.remove('x_tk')
    // window.location.href = 'http://webapp.wdfybj.com/wlhis/index.html'
    return Promise.reject(error)
  }
)

export default service
