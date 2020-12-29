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

export const getCourseById = (courseId: number) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}

export const uploadImage = (data: any, onUploadProgress: (progressEvent: any) => void) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    onUploadProgress
  })
}
