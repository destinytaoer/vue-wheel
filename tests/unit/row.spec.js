import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Row from '@/Grid/Row';
import Col from '@/Grid/Col';

describe('Row', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Row).to.exist;
  });
  it('可以设置 gutter.', done => {
    wrapper = mount(Row, {
      slots: {
        default: [Col, Col]
      },
      propsData: {
        gutter: '20'
      }
    });
    // 需要使用异步来保证元素挂载完成
    wrapper.vm.$nextTick(() => {
      const row = wrapper.find('.row').element;
      expect(row.style.marginLeft).to.eq('-10px');
      expect(row.style.marginRight).to.eq('-10px');
      const cols = wrapper.findAll('.col');
      expect(cols.at(0).element.style.paddingRight).to.eq('10px');
      expect(cols.at(1).element.style.paddingLeft).to.eq('10px');
      // 异步代码需要传入 done，并手动触发 done 来结束，不传 done 时，默认为同步代码，执行完毕自动退出，异步代码不会执行
      done();
    });
  });
  it('可以设置 align.', () => {
    wrapper = mount(Row, {
      propsData: {
        align: 'right'
      }
    });
    expect(wrapper.classes()).to.contain('align-right');
  });
});
