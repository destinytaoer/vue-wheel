import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Col from '@/Grid/Col';

describe('Col', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Col).to.exist;
  });
  it('可以设置 span.', () => {
    wrapper = shallowMount(Col, {
      propsData: {
        span: 1
      }
    });
    expect(wrapper.classes()).to.contain('col-1');
  });
  it('可以设置 offset.', () => {
    wrapper = shallowMount(Col, {
      propsData: {
        offset: 1
      }
    });
    expect(wrapper.classes()).to.contain('offset-1');
  });
  it('可以设置 pad.', () => {
    wrapper = shallowMount(Col, {
      propsData: {
        pad: {
          span: 1,
          offset: 1
        }
      }
    });
    expect(wrapper.classes()).to.contain('col-pad-1');
    expect(wrapper.classes()).to.contain('offset-pad-1');
  });
  it('可以设置 narrow-pc.', () => {
    wrapper = shallowMount(Col, {
      propsData: {
        narrowPc: {
          span: 1,
          offset: 1
        }
      }
    });
    expect(wrapper.classes()).to.contain('col-narrowPc-1');
    expect(wrapper.classes()).to.contain('offset-narrowPc-1');
  });
  it('可以设置 pc.', () => {
    wrapper = shallowMount(Col, {
      propsData: {
        pc: {
          span: 1,
          offset: 1
        }
      }
    });
    expect(wrapper.classes()).to.contain('col-pc-1');
    expect(wrapper.classes()).to.contain('offset-pc-1');
  });
  it('可以设置 wide-pc.', () => {
    wrapper = shallowMount(Col, {
      propsData: {
        widePc: {
          span: 1,
          offset: 1
        }
      }
    });
    expect(wrapper.classes()).to.contain('col-widePc-1');
    expect(wrapper.classes()).to.contain('offset-widePc-1');
  });
});
