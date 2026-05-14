import request from '@/utils/request'

export const loginService = ({ username, password }) => {
  return request.post('/admin/login', { username, password })
}

export const getInfoService = () => {
  return request.post('/admin/getinfo')
}

export const logoutService = () => {
  return request.post('/admin/logout')
}

export const updatePasswordService = ({
  oldpassword,
  password,
  repassword
}) => {
  return request.post('/admin/updatepassword', {
    oldpassword,
    password,
    repassword
  })
}
