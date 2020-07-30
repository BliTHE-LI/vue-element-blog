// 设置本地存储
export const setLocal = (key, value) => {
  // 如果是对象，需要转成字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 获取本地存储
export const getLocal = (key) => {
  let value = localStorage.getItem(key) || ''
  if (value.includes('[') || value.includes('{')) {
    value = JSON.parse(value)
  }
  return value
}

// 移除本地存储
export const removeLocal = (key) => {
  localStorage.removeItem(key)
}

window.setLocal = setLocal
window.getLocal = getLocal
window.removeLocal = removeLocal
