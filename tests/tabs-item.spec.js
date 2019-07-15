const expect = chai.expect;
import Vue from 'vue';
import Tabs from '../../src/Tabs/Tabs';
import TabsHead from '../../src/Tabs/TabsHead';
import TabsBody from '../../src/Tabs/TabsBody';
import TabsItem from '../../src/Tabs/TabsItem';
import TabsContent from '../../src/Tabs/TabsContent';
Vue.component('d-tabs', Tabs);
Vue.component('d-tabs-head', TabsHead);
Vue.component('d-tabs-body', TabsBody);
Vue.component('d-tabs-item', TabsItem);
Vue.component('d-tabs-content', TabsContent);

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('TabsItem', () => {
  it('存在.', () => {
    expect(TabsItem).to.exist;
  });
  describe('props', () => {
    it('可以设置 name', () => {
      const Constructor = Vue.extend(TabsItem);
      const vm = new Constructor({
        propsData: {
          name: 'xxx'
        }
      }).$mount();
      expect(vm.$el.dataset.name).to.eq('xxx');
    });
    it('可以设置 disabled', () => {
      const Constructor = Vue.extend(TabsItem);
      const vm = new Constructor({
        propsData: {
          name: 'xxx',
          disabled: true
        }
      }).$mount();
      expect(vm.$el.classList.contains('disabled')).to.be.true;
      const callback = sinon.fake();
      vm.$on('click', callback);
      expect(callback).not.have.been.called;
    });
  });
  describe('events', () => {
    it('可以点击切换', done => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <d-tabs selected="sports">
          <d-tabs-head>
            <d-tabs-item name="woman">美女</d-tabs-item>
            <d-tabs-item name="sports">体育</d-tabs-item>
            <d-tabs-item name="it">IT</d-tabs-item>
          </d-tabs-head>
          <d-tabs-body>
            <d-tabs-content name="woman">美女</d-tabs-content>
            <d-tabs-content name="sports">体育</d-tabs-content>
            <d-tabs-content name="it">IT</d-tabs-content>
          </d-tabs-body>
        </d-tabs>
      `;
      const vm = new Vue({
        el: div
      });
      const firstItem = vm.$children[0].$children[0].$children[0];
      const callback = sinon.fake();
      firstItem.$on('click', callback);
      firstItem.$el.click();
      expect(callback).have.been.called;
      vm.$nextTick(() => {
        expect(firstItem.$el.classList.contains('active')).to.be.true;
        done();
      });
    });
  });
});
