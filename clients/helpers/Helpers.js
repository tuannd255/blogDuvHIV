import * as ConstantConfig from '../constants/AppConfig'

export function isLogin() {
  let token = localStorage.getItem(ConstantConfig.TOKEN_KEY)
  if (token && token != undefined || token != null) {
    return true
  } else {
    return false
  }
}
