import request from '@/utils/request'

interface Category{
  id?: number
  name?: string
  sort?: number | null
}

export const getAllCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export const saveOrUpdateCategory = (data: Category) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

export const deleteCategory = (categoryId: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${categoryId}`
  })
}
