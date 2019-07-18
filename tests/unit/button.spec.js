import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallowMount, mount } from '@vue/test-utils';
import Button from '@/Button/Button';
import Icon from '@/Common/Icon';
chai.use(sinonChai);
// describe 和 it 是 mocha 的 API
describe('Button', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Button).to.be.ok;
  });
  describe('props', () => {
    it('可以设置icon.', () => {
      wrapper = shallowMount(Button, {
        propsData: {
          icon: 'settings'
        }
      });
      const icon = wrapper.find(Icon);
      expect(icon.props('name')).to.eq('settings');
    });
    it('可以设置loading.', () => {
      wrapper = shallowMount(Button, {
        propsData: {
          icon: 'settings',
          loading: true
        }
      });
      const icons = wrapper.findAll(Icon);
      expect(icons.length).to.equal(1);
      expect(icons.at(0).props('name')).to.eq('loading');
    });
    xit('icon 默认的 order 是 1', () => {
      wrapper = mount(Button, {
        propsData: {
          icon: 'settings'
        }
      });
      const icon = wrapper.find(Icon);
      const style = getComputedStyle(icon.find('svg').element);
      expect(style.order).to.eq('1');
    });
    xit('设置 iconPosition 可以改变 order', () => {
      wrapper = mount(Button, {
        propsData: {
          icon: 'settings',
          iconPos: 'right'
        }
      });
      const icon = wrapper.find(Icon);
      expect(getComputedStyle(icon.element).order).to.eq('2');
    });
  });
  describe('events', () => {
    it('点击 button 触发 click 事件', () => {
      wrapper = mount(Button, {
        propsData: {
          icon: 'settings'
        }
      });

      const callback = sinon.fake();
      wrapper.vm.$on('click', callback);
      wrapper.trigger('click');
      expect(callback).to.have.been.called;
    });
  });
});
