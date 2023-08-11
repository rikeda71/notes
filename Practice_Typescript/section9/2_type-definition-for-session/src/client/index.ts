import { axiosInstance } from './api'
import { Health } from '../types/api'

document.getElementById('ping')!.addEventListener('click', () => {
  axiosInstance.get<Health>('/ping').then(({ data }) => {
    const counter = document.getElementById('count')!
    counter.innerHTML = `${data.count}`
  })
})

// webpack-hot-middlewareのHMR(Hot Module Replacement)を有効
if (module.hot) {
  module.hot.accept()
}
