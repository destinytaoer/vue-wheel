import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Popover from '@/Popover/Popover';

describe('Popover', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Popover).to.exist;
  });
  describe('props', () => {
    it('可以设置 position.', done => {
      wrapper = shallowMount(Popover, {
        propsData: {
          position: 'left'
        },
        slots: {
          default: '<button>上</button>',
          content: '<div>popover 内容</div>'
        }
      });
      const popover = wrapper.vm;
      popover.$nextTick(() => {
        const { content } = popover.$refs;
        expect(content.classList.contains('position-left')).to.be.true;
        done();
      });
    });
    it('可以设置 trigger.', done => {
      wrapper = shallowMount(Popover, {
        propsData: {
          trigger: 'hover'
        },
        slots: {
          default: '<button>上</button>',
          content: '<div>popover 内容</div>'
        }
      });
      let event = new Event('mouseenter');
      const popover = wrapper.vm;
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
    it('click 触发 show/hide.', done => {
      wrapper = shallowMount(Popover, {
        slots: {
          default: '<button>上</button>',
          content: '<div>popover 内容</div>'
        }
      });
      const popover = wrapper.vm;
      const { content } = popover.$refs;
      let callback = sinon.fake();
      let callback2 = sinon.fake();
      popover.$on('show', callback);
      popover.$on('hide', callback2);

      let btn = wrapper.find('button');
      btn.trigger('click');
      expect(callback).to.have.been.called;

      popover.$nextTick(() => {
        expect(content.style.display).to.eq('');
        btn.trigger('click');
        expect(callback2).to.have.been.called;

        popover.$nextTick(() => {
          expect(content.style.display).to.eq('none');
          done();
        });
      });
    });
    it('hover 触发 show/hide.', done => {
      wrapper = shallowMount(Popover, {
        propsData: {
          trigger: 'hover'
        },
        slots: {
          default: '<button>上</button>',
          content: '<div>popover 内容</div>'
        }
      });
      const popover = wrapper.vm;
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
        setTimeout(() => {
          expect(callback2).to.have.been.called;
          popover.$nextTick(() => {
            expect(content.style.display).to.eq('none');
            done();
          });
        }, 300);
      });
    });
  });
});
