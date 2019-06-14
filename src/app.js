import Vue from 'vue'
import Icon from './Icon'
import Button from './Button'
import ButtonGroup from './ButtonGroup'
import Input from './Input'

Vue.component('d-icon', Icon)
Vue.component('d-button', Button)
Vue.component('d-button-group', ButtonGroup)
Vue.component('d-input', Input)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false,
    loading3: false,
  },
  methods: {
    inputChange(e) {
      console.log(e)
    }
  },
})