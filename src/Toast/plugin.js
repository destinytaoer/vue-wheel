import Toast from './Toast'
export default {
  install(Vue, options) {
    // 让用户自己选择是否使用，避免了覆盖的问题
    Vue.prototype.$toast = function (msg, props) {
      let Constructor = Vue.extend(Toast)
      let toast = new Constructor({
        propsData: props
      })
      toast.$slots.default = [msg]
      toast.$mount()
      document.body.appendChild(toast.$el)
    }
  }
}