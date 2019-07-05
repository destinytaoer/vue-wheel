import Icon from '../../src/Common/Icon';
import Button from '../../src/Button/Button';
import ButtonGroup from '../../src/Button/ButtonGroup';
import Input from '../../src/Input/Input';
import Row from '../../src/Grid/Row';
import Col from '../../src/Grid/Col';
import Layout from '../../src/Layout/Layout';
import Header from '../../src/Layout/Header';
import Content from '../../src/Layout/Content';
import Sider from '../../src/Layout/Sider';
import Footer from '../../src/Layout/Footer';
import Toast from '../../src/Toast/Toast';
import toast from '../../src/Toast/plugin';
import Tabs from '../../src/Tabs/Tabs';
import TabsContent from '../../src/Tabs/TabsContent';
import TabsBody from '../../src/Tabs/TabsBody';
import TabsHead from '../../src/Tabs/TabsHead';
import TabsItem from '../../src/Tabs/TabsItem';
import Popover from '../../src/Popover/Popover';
import Collapse from '../../src/Collapse/Collapse';
import CollapseItem from '../../src/Collapse/CollapseItem';
import Cascader from '../../src/Cascader/Cascader';
export default ({ Vue, options, router, siteData }) => {
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
  Vue.component('d-cascader', Cascader);
};
