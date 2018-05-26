import axios from 'axios'
import * as Routes from '../constants/Routes'
import * as ConstantConfig from '../constants/AppConfig'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
const _auth_cookie = localStorage.AUTH_TOKEN

const instance = axios.create({
  baseURL: Routes.BASE_URL,
  withCredentials: true,
  cancelToken: source.token,
  headers: {
    Authorization: _auth_cookie
  }
})

instance.interceptors.request.use((config) => {
  let auth_token = localStorage.getItem(ConstantConfig.TOKEN_KEY)
  config.headers.common[ConstantConfig.HEADER_TOKEN_KEY] = auth_token;
  return config
})

function get(url, params = {}) {
  return instance.get(url, params).then(response => {
    return response.data
  })
}

function sendDelete(url, data) {
  return instance.delete(url, data).then(response => {
    return response.data
  })
}

function sendPatch(url, data) {
  return instance.patch(url, data).then(response => {
    return response.data
  })
}

function sendPut(url, data) {
  return instance.put(url, data).then(response => {
      return response.data
  })
}

function sendPost(url, data) {
  return instance.post(url, data).then(response => {
    return response.data
  })
}

export function login(session) {
  return sendPost(Routes.SIGN_IN, { session })
}

export function logout() {
  return sendDelete(Routes.SIGN_OUT)
}
