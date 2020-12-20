import request from '@/utils/request'

export const getAllRource = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

export const getAllGategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export const getResourcePages = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}
