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

export const getLessonById = (lessonId: number) => {
  return request({
    method: 'GET',
    url: '/boss/course/lesson/getById',
    params: {
      lessonId
    }
  })
}

export const saveOrUpdateLesson = (data: Lesson) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
