class utils {
  static getStorage (key) {
    let result = localStorage.getItem(key)
    if (result) {
      try {
        return JSON.parse(result)
      } catch (error) {
        return result
      }
    }
    return null
  }

  static setStorage (key, value) {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  static deleteStorage (key) {
    localStorage.removeItem(key)
  }

  static isObjectEmpty (o) {
    return Object.values(o).length === 0
  }
}

const plugin = {
  install (Vue) {
    Vue.prototype.$u = utils
  },
}
export default plugin
