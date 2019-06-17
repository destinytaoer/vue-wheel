import Vue from 'vue'
import Icon from './Common/Icon'
import Button from './Button/Button'
import ButtonGroup from './Button/ButtonGroup'
import Input from './Input/Input'
import Row from './Grid/Row'
import Col from './Grid/Col'
import Layout from './Layout/Layout.vue'
import Header from './Layout/Header.vue'
import Content from './Layout/Content.vue'
import Sider from './Layout/Sider.vue'
import Footer from './Layout/Footer.vue'

Vue.component('d-icon', Icon)
Vue.component('d-button', Button)
Vue.component('d-button-group', ButtonGroup)
Vue.component('d-input', Input)
Vue.component('d-row', Row)
Vue.component('d-col', Col)
Vue.component('d-layout', Layout)
Vue.component('d-header', Header)
Vue.component('d-content', Content)
Vue.component('d-sider', Sider)
Vue.component('d-footer', Footer)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false,
    loading3: false,
    message: ''
  },
  methods: {
    inputChange(e) {
      console.log(e)
    }
  },
})