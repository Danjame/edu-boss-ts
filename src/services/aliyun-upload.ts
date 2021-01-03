
import request from '@/utils/request'

interface FileData{
  lessonId: number
  coverImageUrl: string
  fileId: number
  fileName: string
}

export const getImagUploadAddressAdnAuth = () => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

export const getVideoUploadAddressAdnAuth = (fileName?: string, imageUrl?: string) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params: {
      fileName,
      imageUrl
    }
  })
}

export const getTransCode = (data: FileData) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}

export const getTransCodePercent = (lessonId: number) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}
