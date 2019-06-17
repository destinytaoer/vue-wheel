const expect = chai.expect;
import Vue from 'vue'
import Row from '../src/Row'
import Col from '../src/Col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
  it('存在.', () => {
    expect(Row).to.exist
  })
  it('可以设置 gutter.', (done) => {
    Vue.component('d-row', Row)
    Vue.component('d-col', Col)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
      <d-row gutter="20">
        <d-col span="12"></d-col>
        <d-col span="12"></d-col>
      </d-row>
    `
    const vm = new Vue({
      el: div
    })
    // 需要使用异步来保证元素挂载完成
    setTimeout(() => {
      const row = vm.$el.querySelector('.row')
      expect(getComputedStyle(row).marginLeft).to.eq('-10px')
      expect(getComputedStyle(row).marginRight).to.eq('-10px')
      const cols = vm.$el.querySelectorAll('.col')
      expect(getComputedStyle(cols[0]).paddingRight).to.eq('10px')
      expect(getComputedStyle(cols[1]).paddingLeft).to.eq('10px')
      vm.$el.remove()
      vm.$destroy()
      // 异步代码需要传入 done，并手动触发 done 来结束，不传 done 时，默认为同步代码，执行完毕自动退出，异步代码不会执行
      done()
    });
  })
  it('可以设置 align.', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Row)
    const vm = new Constructor({
      propsData: {
        align: 'right'
      }
    }).$mount(div)
    const element = vm.$el
    expect(getComputedStyle(element).justifyContent).to.equal('flex-end')
    vm.$el.remove()
    vm.$destroy()
  })
})