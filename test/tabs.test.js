const expect = chai.expect;
import Vue from 'vue';
import Tabs from '../src/Tabs/Tabs';
import TabsHead from '../src/Tabs/TabsHead';
import TabsBody from '../src/Tabs/TabsBody';
import TabsItem from '../src/Tabs/TabsItem';
import TabsContent from '../src/Tabs/TabsContent';
Vue.component('d-tabs', Tabs);
Vue.component('d-tabs-head', TabsHead);
Vue.component('d-tabs-body', TabsBody);
Vue.component('d-tabs-item', TabsItem);
Vue.component('d-tabs-content', TabsContent);

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Tabs', () => {
  it('存在.', () => {
    expect(Tabs).to.exist;
  });
  describe('props', () => {
    it('可以设置 selected', done => {
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
      vm.$nextTick(() => {
        let active = vm.$el.querySelector('.tabs-item[data-name=sports]');
        expect(active.classList.contains('active')).to.be.true;
        done();
      }, 1000);
    });
    it('可以设置 direction', () => {
      // const div = document.createElement('div');
      // document.body.appendChild(div);
      // div.innerHTML = `
      //   <d-tabs selected="sports">
      //     <d-tabs-head>
      //       <d-tabs-item name="woman">美女</d-tabs-item>
      //       <d-tabs-item name="sports">体育</d-tabs-item>
      //       <d-tabs-item name="it">IT</d-tabs-item>
      //       <template slot="actions">
      //         <d-button>extra button</d-button>
      //       </template>
      //     </d-tabs-head>
      //     <d-tabs-body>
      //       <d-tabs-content name="woman">美女</d-tabs-content>
      //       <d-tabs-content name="sports">体育</d-tabs-content>
      //       <d-tabs-content name="it">IT</d-tabs-content>
      //     </d-tabs-body>
      //   </d-tabs>
      // `;
      // const vm = new Vue({
      //   el: div
      // });
      // vm.$nextTick(() => {
      //   let active = vm.$el.querySelector('.tabs-item[data-name=sports]');
      //   expect(active.classList.contains('active')).to.be.true;
      //   done();
      // }, 1000);
    });
  });
});
