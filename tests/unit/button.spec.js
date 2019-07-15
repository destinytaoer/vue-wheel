import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Button from '@/Button/Button';

// describe 和 it 是 mocha 的 API
describe('Button', () => {
  it('存在.', () => {
    expect(Button).to.be.ok;
  });
  describe('props', () => {
    it('可以设置icon.', () => {
      vm = new Constructor({
        propsData: {
          icon: 'settings'
        }
      }).$mount();
      const useElement = vm.$el.querySelector('use');
      expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings');
    });
    it('可以设置loading.', () => {
      vm = new Constructor({
        propsData: {
          icon: 'settings',
          loading: true
        }
      }).$mount();
      const useElements = vm.$el.querySelectorAll('use');
      expect(useElements.length).to.equal(1);
      expect(useElements[0].getAttribute('xlink:href')).to.equal('#i-loading');
    });
    it('icon 默认的 order 是 1', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      vm = new Constructor({
        propsData: {
          icon: 'settings'
        }
      }).$mount(div);
      const icon = vm.$el.querySelector('svg');
      expect(getComputedStyle(icon).order).to.eq('1');
      vm.$el.remove();
    });
    it('设置 iconPosition 可以改变 order', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      vm = new Constructor({
        propsData: {
          icon: 'settings',
          iconPos: 'right'
        }
      }).$mount(div);
      const icon = vm.$el.querySelector('svg');
      expect(getComputedStyle(icon).order).to.eq('2');
      vm.$el.remove();
    });
  });
  describe('events', () => {
    it('点击 button 触发 click 事件', () => {
      vm = new Constructor({
        propsData: {
          icon: 'settings'
        }
      }).$mount();

      const callback = sinon.fake();
      vm.$on('click', callback);
      vm.$el.click();
      expect(callback).to.have.been.called;
    });
  });
});
