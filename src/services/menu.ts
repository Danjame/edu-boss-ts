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

export const saveOrUpdate = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}
