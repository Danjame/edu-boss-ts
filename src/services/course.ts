import request from '@/utils/request'

interface Courses{
  currentPage?: number
  pageSize?: number
  courseName?: string
}

export const getCourses = (data: Courses) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
