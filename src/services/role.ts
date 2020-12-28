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

interface UserRoles{
  userId: number
  roleIdList: never[]
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

export const getRoleById = (roleId: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${roleId}`
  })
}

export const saveOrUpdateRole = (data: Role) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const deleteRole = (roleId: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${roleId}`
  })
}

export const getUserRoles = (userId: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}

export const allocateUserRoles = (data: UserRoles) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
