import Vue from 'vue'
import Icon from './Icon'
import Button from './Button'
import ButtonGroup from './Button-Group'

Vue.component('g-icon', Icon)
Vue.component('g-button', Button)
Vue.component('g-button-group', ButtonGroup)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false,
    loading3: false,
  }
})

import chai from 'chai'
const expect = chai.expect
// 单元测试，编写测试用例
{
  // 测试 icon 路径
  const Constructor = Vue.extend(Button)
  let vm = new Constructor({
    propsData: {
      icon: 'settings'
    }
  }).$mount()
  let useEl = vm.$el.querySelector('use')
  let href = useEl.getAttribute('xlink:href')
  expect(href).to.equal('#i-settings')
  vm.$destroy()
}
{
  // 测试 loading 时的 icon 路径
  const Constructor = Vue.extend(Button)
  let vm = new Constructor({
    propsData: {
      icon: 'settings',
      loading: true
    }
  }).$mount()
  let useEl = vm.$el.querySelector('use')
  let href = useEl.getAttribute('xlink:href')
  expect(href).to.equal('#i-loading')
  vm.$destroy()
}
{
  // 测试 icon 的 order 属性
  // 注意元素出现在页面中的才会具有 CSS 属性
  const div = document.createElement('div')
  document.body.appendChild(div)
  const Constructor = Vue.extend(Button)
  let vm = new Constructor({
    propsData: {
      icon: 'settings',
      loading: true
    }
  }).$mount(div)
  let svg = vm.$el.querySelector('svg')
  let { order } = window.getComputedStyle(svg)
  expect(order).to.eq("1")
  vm.$el.remove()
  vm.$destroy()
}
{
  // 测试 icon 的 order 属性
  // 注意元素出现在页面中的才会具有 CSS 属性
  const div = document.createElement('div')
  document.body.appendChild(div)
  const Constructor = Vue.extend(Button)
  let button = new Constructor({
    propsData: {
      icon: 'settings',
      iconPos: 'right',
      loading: true
    }
  }).$mount(div)
  let svg = button.$el.querySelector('svg')
  let { order } = window.getComputedStyle(svg)
  expect(order).to.eq("2")
  button.$el.remove()
  button.$destroy()
}
{
  // 测试 click 事件
  const Constructor = Vue.extend(Button)
  let vm = new Constructor({
    propsData: {
      icon: 'settings',
      iconPos: 'right',
      loading: true
    }
  }).$mount()
  vm.$on('click', function () {
    console.log(1)
  })
  vm.$el.click()
  vm.$destroy()
}