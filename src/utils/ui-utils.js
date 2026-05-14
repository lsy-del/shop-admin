import { ElMessageBox } from 'element-plus'
import nProgress from 'nprogress'

export const showModal = (
  conten = '提示内容',
  type = 'warning',
  title = ''
) => {
  return ElMessageBox.confirm(conten, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
}

// 显示全屏loading
export const showLoading = () => {
  nProgress.start()
}
// 隐藏全屏loading
export const hideLoading = () => {
  nProgress.done()
}
