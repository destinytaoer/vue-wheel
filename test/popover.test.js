const expect = chai.expect;
import Vue from 'vue';
import Popover from '../src/Popover/Popover';

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Popover', () => {
  let vm;
  afterEach(() => {
    if (vm) {
      vm.$el.remove();
      vm.$destroy();
    }
  });
  it('存在.', () => {
    expect(Popover).to.exist;
  });
  describe('props', () => {
    it('可以设置 position.', done => {
      Vue.component('d-popover', Popover);
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <d-popover position="left">
          <template v-slot:content>
            <div>
              popover 内容
            </div>
          </template>
          <template v-slot:default>
            <button>上</button>
          </template>
        </d-popover>
      `;
      vm = new Vue({
        el: div
      });
      const popover = vm.$children[0];
      vm.$nextTick(() => {
        const { content } = popover.$refs;
        expect(content.classList.contains('position-left')).to.be.true;
        done();
      });
    });
    it('可以设置 trigger.', done => {
      Vue.component('d-popover', Popover);
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <d-popover trigger="hover">
          <template v-slot:content>
            <div>
              popover 内容
            </div>
          </template>
          <template v-slot:default>
            <button>上</button>
          </template>
        </d-popover>
      `;
      vm = new Vue({
        el: div
      });
      let event = new Event('mouseenter');
      const popover = vm.$children[0];
      const { content } = popover.$refs;
      expect(content.style.display).to.eq('none');
      popover.$el.dispatchEvent(event);
      popover.$nextTick(() => {
        expect(content.style.display).to.eq('');
        done();
      });
    });
  });
  describe('events', () => {
    it('click 事件.', done => {
      Vue.component('d-popover', Popover);
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <d-popover>
          <template v-slot:content>
            <div>
              popover 内容
            </div>
          </template>
          <template v-slot:default>
            <button>上</button>
          </template>
        </d-popover>
      `;
      vm = new Vue({
        el: div
      });
      const popover = vm.$children[0];
      const { content } = popover.$refs;
      let callback = sinon.fake();
      let callback2 = sinon.fake();
      popover.$on('show', callback);
      popover.$on('hide', callback2);

      let btn = vm.$el.querySelector('button');
      btn.click();
      expect(callback).to.have.been.called;

      popover.$nextTick(() => {
        expect(content.style.display).to.eq('');
        btn.click();
        expect(callback2).to.have.been.called;

        popover.$nextTick(() => {
          expect(content.style.display).to.eq('none');
          done();
        });
      });
    });
    it('hover 事件.', done => {
      Vue.component('d-popover', Popover);
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <div>
        <d-popover trigger="hover">
          <template v-slot:content>
            <div>
              popover 内容
            </div>
          </template>
          <template v-slot:default>
            <button>上</button>
          </template>
        </d-popover>
      `;
      vm = new Vue({
        el: div
      });
      const popover = vm.$children[0];
      const { content } = popover.$refs;
      let callback = sinon.fake();
      let callback2 = sinon.fake();
      popover.$on('show', callback);
      popover.$on('hide', callback2);

      let event = new Event('mouseenter');
      popover.$el.dispatchEvent(event);
      expect(callback).to.have.been.called;

      popover.$nextTick(() => {
        expect(content.style.display).to.eq('');
        let event = new Event('mouseover');
        document.dispatchEvent(event);
        expect(callback2).to.have.been.called;

        popover.$nextTick(() => {
          expect(content.style.display).to.eq('none');
          done();
        });
      });
    });
  });
});
