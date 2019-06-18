import Vue from 'vue'
import Icon from './Common/Icon'
import Button from './Button/Button'
import ButtonGroup from './Button/ButtonGroup'
import Input from './Input/Input'
import Row from './Grid/Row'
import Col from './Grid/Col'
import Layout from './Layout/Layout'
import Header from './Layout/Header'
import Content from './Layout/Content'
import Sider from './Layout/Sider'
import Footer from './Layout/Footer'
import Toast from './Toast/Toast'
import toast from './Toast/plugin'

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
Vue.component('d-toast', Toast)
Vue.use(toast)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false,
    loading3: false,
    message: ''
  },
  methods: {
    inputChange(e) {},
    showToast() {
      this.$toast(`随机数：${Math.random()}`, {
        autoClose: false,
        position: 'top',
        closeButton: {
          text: '知道了',
          callback: () => {
            console.log('你点我干啥')
          }
        }
      });
    }
  },
  mounted() {

  },
})