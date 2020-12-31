import request from '@/utils/request'

interface Lesson{
  id?: number
  courseId?: number
  sectionId?: number
  theme?: string
  duration?: number
  isFree?: boolean
  orderNum?: number
  status?: number
}

export const saveOrUpdateLesson = (data: Lesson) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
