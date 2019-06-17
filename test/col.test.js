const expect = chai.expect;
import Vue from 'vue'
// import Row from '../src/Row'
import Col from '../src/Grid/Col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Col', () => {
  it('存在.', () => {
    expect(Col).to.exist
  })
  it('可以设置 span.', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        span: 1
      }
    }).$mount(div)
    expect(vm.$el.classList.contains('col-1')).to.eq(true)
    vm.$el.remove()
    vm.$destroy()
  })
  it('可以设置 offset.', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        offset: 1
      }
    }).$mount(div)
    expect(vm.$el.classList.contains('offset-1')).to.eq(true)
    vm.$el.remove()
    vm.$destroy()
  })
  it('可以设置 pad.', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        pad: {
          span: 1,
          offset: 1
        }
      }
    }).$mount(div)
    expect(vm.$el.classList.contains('col-pad-1')).to.eq(true)
    expect(vm.$el.classList.contains('offset-pad-1')).to.eq(true)
    vm.$el.remove()
    vm.$destroy()
  })
  it('可以设置 narrow-pc.', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        narrowPc: {
          span: 1,
          offset: 1
        }
      }
    }).$mount(div)
    expect(vm.$el.classList.contains('col-narrowPc-1')).to.eq(true)
    expect(vm.$el.classList.contains('offset-narrowPc-1')).to.eq(true)
    vm.$el.remove()
    vm.$destroy()
  })
  it('可以设置 pc.', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        pc: {
          span: 1,
          offset: 1
        }
      }
    }).$mount(div)
    expect(vm.$el.classList.contains('col-pc-1')).to.eq(true)
    expect(vm.$el.classList.contains('offset-pc-1')).to.eq(true)
    vm.$el.remove()
    vm.$destroy()
  })
  it('可以设置 wide-pc.', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        widePc: {
          span: 1,
          offset: 1
        }
      }
    }).$mount(div)
    expect(vm.$el.classList.contains('col-widePc-1')).to.eq(true)
    expect(vm.$el.classList.contains('offset-widePc-1')).to.eq(true)
    vm.$el.remove()
    vm.$destroy()
  })
})