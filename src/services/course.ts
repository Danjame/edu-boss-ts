import request from '@/utils/request'

interface Courses{
  currentPage?: number
  pageSize?: number
  courseName?: string
}

interface State{
  courseId: number
  status: number
}

export const getCourses = (data: Courses) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const changeState = (state: State) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: state
  })
}
