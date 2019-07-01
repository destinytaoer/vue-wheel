import Vue from 'vue';
import Icon from './Common/Icon';
import Button from './Button/Button';
import ButtonGroup from './Button/ButtonGroup';
import Input from './Input/Input';
import Row from './Grid/Row';
import Col from './Grid/Col';
import Layout from './Layout/Layout';
import Header from './Layout/Header';
import Content from './Layout/Content';
import Sider from './Layout/Sider';
import Footer from './Layout/Footer';
import Toast from './Toast/Toast';
import toast from './Toast/plugin';
import Tabs from './Tabs/Tabs.vue';
import TabsContent from './Tabs/TabsContent';
import TabsBody from './Tabs/TabsBody';
import TabsHead from './Tabs/TabsHead';
import TabsItem from './Tabs/TabsItem';
import Popover from './Popover/Popover';
import Collapse from './Collapse/Collapse';
import CollapseItem from './Collapse/CollapseItem';

Vue.component('d-icon', Icon);
Vue.component('d-button', Button);
Vue.component('d-button-group', ButtonGroup);
Vue.component('d-input', Input);
Vue.component('d-row', Row);
Vue.component('d-col', Col);
Vue.component('d-layout', Layout);
Vue.component('d-header', Header);
Vue.component('d-content', Content);
Vue.component('d-sider', Sider);
Vue.component('d-footer', Footer);
Vue.component('d-toast', Toast);
Vue.use(toast);
Vue.component('d-tabs', Tabs);
Vue.component('d-tabs-head', TabsHead);
Vue.component('d-tabs-body', TabsBody);
Vue.component('d-tabs-item', TabsItem);
Vue.component('d-tabs-content', TabsContent);
Vue.component('d-popover', Popover);
Vue.component('d-collapse', Collapse);
Vue.component('d-collapse-item', CollapseItem);

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false,
    loading3: false,
    message: '',
    selectedTab: 'sports'
  },
  methods: {
    inputChange(e) {},
    showToast(position) {
      this.$toast(`随机数：${Math.random()}`, {
        autoClose: 1,
        position,
        enableButton: true
      });
    }
  },
  mounted() {}
});
