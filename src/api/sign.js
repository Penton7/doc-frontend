import request from '@/utils/request'

export function signDoc(data) {
  return request({
    url: '/document/sign',
    method: 'post',
    data
  })
}
