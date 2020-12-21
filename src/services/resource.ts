import request from '@/utils/request'

export const getAllRource = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

export const getAllGategories = (id: any) => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll',
    params: {
      resourceId: id
    }
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
    url: `/boss/resource/${id}`
  })
}

export const saveOrUpdateResource = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

export const deleteResource = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

export const saveOrUpdateCategories = (id: number) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    params: {
      id
    }
  })
}
