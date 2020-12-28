import request from '@/utils/request'

interface Menu{
  id?: number
  name: string
  parentId: number
  href: string
  icon?: string
  string?: string
  orderNum?: number
  description?: string
  shown?: boolean | null
}

interface AllocMenus{
  roleId: number
  menuIdList: number[]
}

export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const saveOrUpdateMenu = (data: Menu) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (menuId: string | (string | null)[] | -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      menuId
    }
  })
}

export const deleteMenu = (menuId: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${menuId}`
  })
}

export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

export const getRoleMenus = (roleId: number) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}

export const allocateRoleMenus = (data: AllocMenus) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}
