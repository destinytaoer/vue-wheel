import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallowMount, mount } from '@vue/test-utils';
import Input from '@/Input/Input';
chai.use(sinonChai);

// describe 和 it 是 mocha 的 API
describe('Input', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  // 每一个 it 都是一个测试用例
  // 第一个参数表示测试用例的名称，第二个参数表示测试函数
  it('存在.', () => {
    expect(Input).to.exist;
  });
  // 进行分组描述
  describe('props', () => {
    it('可以设置 value.', () => {
      wrapper = shallowMount(Input, {
        propsData: {
          value: '1234'
        }
      });
      const inputElement = wrapper.find('input');
      expect(inputElement.element.value).to.equal('1234');
    });
    it('可以设置 disabled.', () => {
      wrapper = shallowMount(Input, {
        propsData: {
          disabled: true
        }
      });
      const inputElement = wrapper.find('input');
      expect(inputElement.element.disabled).to.be.true;
    });
    it('可以设置 readonly.', () => {
      wrapper = shallowMount(Input, {
        propsData: {
          readonly: true
        }
      });
      const inputElement = wrapper.find('input');
      // readonly 属性获取时，需要大写 O
      expect(inputElement.element.readOnly).to.be.true;
    });
    it('可以设置 error.', () => {
      wrapper = mount(Input, {
        propsData: {
          error: 'xxx'
        }
      });
      // 需要具有 icon
      const useElement = wrapper.find('use');
      expect(useElement.attributes().href).to.equal('#i-warn');
      // 需要有信息
      let errMsg = wrapper.find('.errMsg');
      expect(errMsg.text()).to.equal('xxx');
    });
  });
  describe('events', () => {
    // 合并事件
    it('触发 change/input/focus/blur 事件', () => {
      ['change', 'input', 'focus', 'blur'].forEach(eventName => {
        wrapper = shallowMount(Input);
        const callback = sinon.fake();
        wrapper.vm.$on(eventName, callback);
        let inputElement = wrapper.find('input');
        // 手动创建事件并进行派发
        let event = new Event(eventName);
        Object.defineProperty(event, 'target', {
          value: {
            value: 'xxx'
          }
        });
        inputElement.element.dispatchEvent(event);
        // 期望回调被调用，并且携带了参数 event，传给 calledWith 的所有参数就是期望携带的参数
        expect(callback).to.have.been.calledWith('xxx');
      });
    });
  });
});
