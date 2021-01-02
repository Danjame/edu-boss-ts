import request from '@/utils/request'

interface Section{
  id?: number
  courseId?: number
  courseName?: string
  sectionName?: string
  description?: string
  orderNum?: number
  status?: number
}

export const getSectionLesson = (courseId: number) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}

export const getSectionById = (sectionId: number) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getBySectionId',
    params: {
      sectionId
    }
  })
}

export const saveOrUpdateSection = (data: Section) => {
  return request({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}
