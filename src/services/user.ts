import request from '@/utils/request'
import qs from 'qs'

interface User{
  phone: string
  password: string
}

interface UserPages{
  phone?: string
  userId?: number | null
  startCreateTime?: string
  endCreateTime?: string
  currentPage: number
  pageSize: number
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

export const getUserPages = (data: UserPages) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}

export const enableUser = (userId: number) => {
  return request({
    method: 'GET',
    url: '/boss/user/enableUser',
    params: {
      userId
    }
  })
}

export const forbidUser = (userId: number) => {
  return request({
    method: 'POST',
    url: '/boss/user/forbidUser',
    data: {
      userId
    }
  })
}
