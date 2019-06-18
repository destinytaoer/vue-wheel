import Toast from './Toast'
export default {
  install(Vue, options) {
    // 让用户自己选择是否使用，避免了覆盖的问题
    Vue.prototype.$toast = function (msg) {
      let Constructor = Vue.extend(Toast)
      let toast = new Constructor()
      toast.$slots.default = [msg]
      toast.$mount()
      document.body.appendChild(toast.$el)
    }
  }
}