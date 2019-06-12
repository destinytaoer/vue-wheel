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