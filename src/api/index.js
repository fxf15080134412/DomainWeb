import request from '@/utils/request'

//上传
export function upload(data) {
  return request({
    url: '/api/admin/uploads',
    method: 'post',
    data: data,
    headers:{'Content-Type':'multipart/form-data'}
  })
}


