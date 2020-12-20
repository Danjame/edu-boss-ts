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

export const getEditResourceInfo = (id: any = -1) => {
  return request({
    method: 'GET',
    url: '/boss/resource',
    params: {
      id
    }
  })
}

export const saveOrUpdate = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}
