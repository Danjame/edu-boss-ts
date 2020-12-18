import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import qs from 'qs'
import router from '@/router'

const request = axios.create()

const redirect = () => {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

const refreshToken = () => {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

let isRefreshing = false
let pendingResquests: any[] = []
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('请求成功')
  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data)
    // console.log(error.response.status)
    // console.log(error.response.headers)
    const { status } = error.response
    switch (status) {
      case 400:
        Message.error('参数错误')
        break
      case 401:
        // 无用户信息
        if (!store.state.user) {
          redirect()
          return Promise.reject(error)
        }
        // 没有刷新
        if (!isRefreshing) {
          isRefreshing = true
          return refreshToken().then(res => {
            if (!res.data.success) {
              throw new Error('Token 刷新失败')
            }
            // 重新记录用户信息
            store.commit('setUser', res.data.content)
            // 执行挂起的请求并清空
            pendingResquests.forEach(cb => cb())
            pendingResquests = []
            return request(error.config)
          }).catch(err => {
            console.log(err)
            store.commit('setUser', null)
            redirect()
            return Promise.reject(error)
          }).finally(() => {
            isRefreshing = false
          })
        } else {
          // 正在刷新
          return new Promise(resolve => {
            // 保存挂起的请求
            pendingResquests.push(() => {
              resolve(request(error.config))
            })
          })
        }
      case 403:
        Message.error('没有权限')
        break
      case 404:
        Message.error('资源不存在')
        break
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
    Message.error('请求超时，请重试')
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    Message.error(`请求失败:${error.message}`)
  }
  return Promise.reject(error)
})

export default request
