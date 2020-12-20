import request from '@/utils/request'

// interface Menu{
//   id: number | undefined
//   parentId: string
//   name: string
//   href: string
//   icon: string
//   orderNum: number
//   description: string
//   shown: boolean
// }

export const getAll = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const saveOrUpdate = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: any = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
