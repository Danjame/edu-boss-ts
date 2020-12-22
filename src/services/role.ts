import request from '@/utils/request'

interface Role{
  id?: number
  code: string
  name: string
  description?: string
}

interface RolePages{
  id?: number
  code?: string
  name: string
  current: number
  size: number
}

export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

export const getRolePages = (data: RolePages) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const saveOrUpdateRole = (data: Role) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
