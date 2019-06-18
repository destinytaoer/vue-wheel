const expect = chai.expect;
import Vue from 'vue';
import Toast from '../src/Toast/Toast';

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Toast', () => {
  const Constructor = Vue.extend(Toast);
  let vm;
  afterEach(() => {
    if (vm) {
      vm.$el.remove();
      vm.$destroy();
    }
  });
  it('存在.', () => {
    expect(Toast).to.exist;
  });
  describe('props', () => {
    it('可以设置 autoClose', done => {
      let div = document.createElement('div');
      document.body.appendChild(div);
      vm = new Constructor({
        propsData: {
          autoClose: 1
        }
      }).$mount(div);
      vm.$on('close', () => {
        expect(document.body.contains(vm.$el)).to.eq(false);
        done();
      });
    });
    it('可以设置 enableButton', () => {
      let div = document.createElement('div');
      document.body.appendChild(div);
      vm = new Constructor({
        propsData: {
          enableButton: true
        }
      }).$mount(div);
      let close = vm.$el.querySelector('.close');
      expect(close.textContent.trim()).to.eq('关闭');
    });
    it('可以设置 closeButton', () => {
      let div = document.createElement('div');
      document.body.appendChild(div);
      vm = new Constructor({
        propsData: {
          enableButton: true,
          closeButton: {
            text: '知道了'
          }
        }
      }).$mount(div);
      let close = vm.$el.querySelector('.close');
      expect(close.textContent.trim()).to.eq('知道了');
    });
    it('可以设置 enableHtml', () => {
      vm = new Constructor({
        propsData: {
          position: 'bottom'
        }
      }).$mount();
      expect(vm.$el.classList.contains('position-bottom')).to.eq(true);
    });
  });
  describe('events', () => {
    it('click & close', () => {
      let div = document.createElement('div');
      document.body.appendChild(div);
      const callback = sinon.fake();
      vm = new Constructor({
        propsData: {
          enableButton: true,
          closeButton: {
            text: '关闭',
            callback
          }
        }
      }).$mount(div);
      let callback2 = sinon.fake();
      vm.$on('close', callback2);
      let close = vm.$el.querySelector('.close');
      close.click();
      expect(callback).to.have.been.called;
      expect(callback2).to.have.been.called;
    });
  });
});
