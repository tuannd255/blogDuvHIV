import axios from 'axios'
const CancelToken = axios.CancelToken
const source = CancelToken.source()

const BASE_URL = 'http://localhost:3000/api/v1/'
const TOKEN_KEY = 'AUTH_TOKEN'
const HEADER_TOKEN_KEY = 'Authorization'

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  cancelToken: source.token
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
  return sendPost('/sign_in', { session })
}
