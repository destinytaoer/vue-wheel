import Toast from './Toast';

function createToast({ Vue, msg, propsData, onClose }) {
  let Constructor = Vue.extend(Toast);
  let toast = new Constructor({
    propsData
  });
  toast.$slots.default = [msg];
  toast.$mount();
  toast.$on('close', onClose);
  document.body.appendChild(toast.$el);
  return toast;
}

let curToast;

export default {
  install(Vue, options) {
    // 让用户自己选择是否使用，避免了覆盖的问题
    Vue.prototype.$toast = function(msg, propsData) {
      if (curToast) {
        curToast.close();
      }
      curToast = createToast({
        Vue,
        msg,
        propsData,
        onClose: () => {
          curToast = null;
        }
      });
    };
  }
};
