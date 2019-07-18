import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Toast from '@/Toast/Toast';

describe('Toast', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Toast).to.exist;
  });
  describe('props', () => {
    it('可以设置 autoClose', done => {
      wrapper = shallowMount(Toast, {
        propsData: {
          autoClose: 1
        }
      });
      wrapper.vm.$on('close', () => {
        expect(document.body.contains(wrapper.element)).to.eq(false);
        done();
      });
    });
    it('可以设置 enableButton', () => {
      wrapper = shallowMount(Toast, {
        propsData: {
          enableButton: true
        }
      });
      let close = wrapper.find('.close');
      expect(close).to.be.exist;
      expect(close.text()).to.eq('关闭');
    });
    it('可以设置 closeButton 文本', () => {
      wrapper = shallowMount(Toast, {
        propsData: {
          enableButton: true,
          closeButton: {
            text: '知道了'
          }
        }
      });
      let close = wrapper.find('.close');
      expect(close.text()).to.eq('知道了');
    });
    it('可以设置 enableHtml', () => {
      wrapper = shallowMount(Toast, {
        propsData: {
          position: 'bottom'
        }
      });
      expect(wrapper.classes()).to.contain('position-bottom');
    });
  });
  describe('events', () => {
    it('click & close', () => {
      const callback = sinon.fake();
      wrapper = shallowMount(Toast, {
        propsData: {
          enableButton: true,
          closeButton: {
            text: '关闭',
            callback
          }
        }
      });
      const callback2 = sinon.fake();
      wrapper.vm.$on('close', callback2);
      let close = wrapper.find('.close');
      close.trigger('click');
      expect(callback).to.have.been.called;
      expect(callback2).to.have.been.called;
    });
  });
});
