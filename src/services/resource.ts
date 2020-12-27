import request from '@/utils/request'

interface ResourcePages{
  id?: number
  name?: string
  url?: string
  categoryId?: number | null
  current?: number
  size?: number
}

interface ResourceItem{
  id?: number
  name: string
  categoryId: number | null
  url: string
  description?: string
}

interface Category{
  id?: number
  name?: string
  sort?: number | null
}

interface AllocResources{
  roleId: number
  resourceIdList: number[]
}

export const getAllRource = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

export const getAllCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export const getResourcePages = (data: ResourcePages) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getEditResourceInfo = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/resource/${id}`
  })
}

export const saveOrUpdateResource = (data: ResourceItem) => {
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

export const saveOrUpdateCategory = (data: Category) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

export const deleteCategory = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}

export const getRoleResources = (id: number) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId: id
    }
  })
}

export const allocateRoleResources = (data: AllocResources) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}
