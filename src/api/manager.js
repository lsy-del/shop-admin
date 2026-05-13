import request from '@/utils/request'

export const loginService = ({ username, password }) => {
  return request.post('/admin/login', { username, password })
}
