const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/Input'

Vue.config.productionTip = false
Vue.config.devtools = false

// describe 和 it 是 mocha 的 API
describe('Input', () => {
  const Constructor = Vue.extend(Input)
  let vm
  afterEach(() => {
    vm && vm.$destroy()
  })
  // 每一个 it 都是一个测试用例
  // 第一个参数表示测试用例的名称，第二个参数表示测试函数
  it('存在.', () => {
    expect(Input).to.exist
  })
  // 进行分组描述
  describe('props', () => {
    it('可以设置 value.', () => {
      vm = new Constructor({
        propsData: {
          value: '1234'
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.value).to.equal('1234')
    })
    it('可以设置 disabled.', () => {
      vm = new Constructor({
        propsData: {
          disabled: true
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.disabled).to.equal(true)
    })
    it('可以设置 readonly.', () => {
      vm = new Constructor({
        propsData: {
          readonly: true
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      // readonly 属性获取时，需要大写 O
      expect(inputElement.readOnly).to.equal(true)
    })
    it('可以设置 error.', () => {
      vm = new Constructor({
        propsData: {
          error: 'xxx'
        }
      }).$mount()
      // 需要具有 icon
      const useElement = vm.$el.querySelector('use')
      expect(useElement.getAttribute('xlink:href')).to.equal('#i-warn')
      // 需要有信息
      let errMsg = vm.$el.querySelector('.errMsg')
      expect(errMsg.innerText).to.equal('xxx')
    })
  })
  describe('events', () => {
    // 合并事件
    it('触发 change/input/focus/blur 事件', () => {
      ['change', 'input', 'focus', 'blur'].forEach((eventName) => {
        vm = new Constructor({}).$mount()
        const callback = sinon.fake()
        vm.$on(eventName, callback)
        let inputElement = vm.$el.querySelector('input')
        // 手动创建事件并进行派发
        let event = new Event(eventName)
        inputElement.dispatchEvent(event)
        // 期望回调被调用，并且携带了参数 event，传给 calledWith 的所有参数就是期望携带的参数
        expect(callback).to.have.been.calledWith(event)
      })
    })
  })
})