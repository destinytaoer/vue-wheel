import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';
import Tabs from '@/Tabs/Tabs';
import TabsHead from '@/Tabs/TabsHead';
import TabsBody from '@/Tabs/TabsBody';
import TabsItem from '@/Tabs/TabsItem';
import TabsContent from '@/Tabs/TabsContent';
Vue.component('d-tabs', Tabs);
Vue.component('d-tabs-head', TabsHead);
Vue.component('d-tabs-body', TabsBody);
Vue.component('d-tabs-item', TabsItem);
Vue.component('d-tabs-content', TabsContent);

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Tabs', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Tabs).to.exist;
    expect(TabsHead).to.exist;
    expect(TabsBody).to.exist;
    expect(TabsItem).to.exist;
    expect(TabsContent).to.exist;
  });
  describe('Tabs props', () => {
    it('可以设置 selected', done => {
      wrapper = mount(Tabs, {
        propsData: {
          selected: 'sports'
        },
        slots: {
          default: `
          <d-tabs-head>
            <d-tabs-item name="woman">美女</d-tabs-item>
            <d-tabs-item name="sports">体育</d-tabs-item>
            <d-tabs-item name="it">IT</d-tabs-item>
          </d-tabs-head>
          <d-tabs-body>
            <d-tabs-content name="woman">美女</d-tabs-content>
            <d-tabs-content name="sports">体育</d-tabs-content>
            <d-tabs-content name="it">IT</d-tabs-content>
          </d-tabs-body>`
        }
      });
      wrapper.vm.$nextTick(() => {
        let active = wrapper.find('.tabs-item[data-name=sports]');
        expect(active.classes()).to.contain('active');
        done();
      });
    });
  });
  describe('TabsItem props', () => {
    it('可以设置 name', () => {
      wrapper = mount(Tabs, {
        propsData: {
          selected: 'sports'
        },
        slots: {
          default: `
          <d-tabs-head>
            <d-tabs-item name="woman">美女</d-tabs-item>
            <d-tabs-item name="sports">体育</d-tabs-item>
            <d-tabs-item name="it">IT</d-tabs-item>
          </d-tabs-head>
          <d-tabs-body>
            <d-tabs-content name="woman">美女</d-tabs-content>
            <d-tabs-content name="sports">体育</d-tabs-content>
            <d-tabs-content name="it">IT</d-tabs-content>
          </d-tabs-body>`
        }
      });
      const tabsItems = wrapper.findAll(TabsItem);
      expect(tabsItems.at(0).element.dataset.name).to.eq('woman');
      expect(tabsItems.at(1).element.dataset.name).to.eq('sports');
      expect(tabsItems.at(2).element.dataset.name).to.eq('it');
    });
    it('可以设置 disabled', () => {
      wrapper = mount(Tabs, {
        propsData: {
          selected: 'sports'
        },
        slots: {
          default: `
          <d-tabs-head>
            <d-tabs-item name="woman" disabled>美女</d-tabs-item>
            <d-tabs-item name="sports">体育</d-tabs-item>
            <d-tabs-item name="it">IT</d-tabs-item>
          </d-tabs-head>
          <d-tabs-body>
            <d-tabs-content name="woman">美女</d-tabs-content>
            <d-tabs-content name="sports">体育</d-tabs-content>
            <d-tabs-content name="it">IT</d-tabs-content>
          </d-tabs-body>`
        }
      });
      const firstItem = wrapper.find(TabsItem);
      expect(firstItem.classes()).to.contain('disabled');
      const callback = sinon.fake();
      firstItem.vm.$on('click', callback);
      firstItem.trigger('click');
      expect(callback).not.have.been.called;
    });
  });
  describe('events', () => {
    it('可以点击切换', done => {
      wrapper = mount(Tabs, {
        propsData: {
          selected: 'sports'
        },
        slots: {
          default: `
          <d-tabs-head>
            <d-tabs-item name="woman">美女</d-tabs-item>
            <d-tabs-item name="sports">体育</d-tabs-item>
            <d-tabs-item name="it">IT</d-tabs-item>
          </d-tabs-head>
          <d-tabs-body>
            <d-tabs-content name="woman">美女</d-tabs-content>
            <d-tabs-content name="sports">体育</d-tabs-content>
            <d-tabs-content name="it">IT</d-tabs-content>
          </d-tabs-body>`
        }
      });
      const firstItem = wrapper.find(TabsItem);
      const callback = sinon.fake();
      firstItem.vm.$on('click', callback);
      firstItem.trigger('click');
      expect(callback).have.been.called;
      firstItem.vm.$nextTick(() => {
        expect(firstItem.classes()).to.contain('active');
        done();
      });
    });
  });
});
