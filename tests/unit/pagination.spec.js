import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Pagination from '@/Pagination/Pagination';

describe('Pagination', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Pagination).to.exist;
  });
  describe('props', () => {
    it('默认高亮第一个', () => {
      wrapper = mount(Pagination, {
        propsData: {
          totalPage: 20
        }
      });
      let item = wrapper.find('[data-index="1"]');
      expect(item.classes()).to.contain('active');
    });
    it('可以设置 hideIfOnePage', done => {
      wrapper = mount(Pagination, {
        propsData: {
          totalPage: 1,
          hideIfOnePage: true
        }
      });
      wrapper.vm.$nextTick(() => {
        expect(wrapper.classes()).to.contain('hide');
        done();
      });
    });
    describe('设置 currentPage', () => {
      it('高亮 currentPage', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 20,
            currentPage: 5
          }
        });
        let item = wrapper.find('[data-index="5"]');
        expect(item.classes()).to.contain('active');
      });
      it('currentPage 为 1，则 prev 不可点击', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 20
          }
        });
        let prev = wrapper.find('[data-index="prev"]');
        let next = wrapper.find('[data-index="next"]');
        expect(prev.classes()).to.contain('disabled');
        expect(next.classes()).to.not.contain('disabled');
      });
      it('currentPage 为 totalPage，则 next 不可点击', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 20,
            currentPage: 20
          }
        });
        let prev = wrapper.find('[data-index="prev"]');
        let next = wrapper.find('[data-index="next"]');
        expect(prev.classes()).to.not.contain('disabled');
        expect(next.classes()).to.contain('disabled');
      });
    });
    describe('根据 totalPage & currentPage 显示不同', () => {
      it('totalPage 小于 6 则全部显示', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 4
          }
        });
        let items = wrapper.findAll('[data-index]');
        expect(items.length).to.eq(6);
      });
      it('totalPage 7，currentPage 1 则不显示 6', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 7
          }
        });
        let item = wrapper.find('[data-index="6"]');
        expect(item.exists()).to.not.be.true;
      });
      it('totalPage 7，currentPage 5 则不显示 2', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 7,
            currentPage: 5
          }
        });
        let item = wrapper.find('[data-index="2"]');
        expect(item.exists()).to.not.be.true;
      });
      it('totalPage 7，currentPage 4 则全部显示', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 7,
            currentPage: 4
          }
        });
        let items = wrapper.findAll('[data-index]');
        expect(items.length).to.eq(9);
      });
    });
    describe('设置 pageRange 为 3', () => {
      it('totalPage 小于 4 则全部显示', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 4,
            pageRange: 3
          }
        });
        let items = wrapper.findAll('[data-index]');
        expect(items.length).to.eq(6);
      });
      it('totalPage 5，currentPage 1，则 4 不显示', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 5,
            pageRange: 3
          }
        });
        let item = wrapper.find('[data-index="4"]');
        expect(item.exists()).to.not.be.true;
      });
      it('totalPage 5，currentPage 4，则 2 不显示', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 5,
            currentPage: 4,
            pageRange: 3
          }
        });
        let item = wrapper.find('[data-index="2"]');
        expect(item.exists()).to.not.be.true;
      });
      it('totalPage 5，currentPage 3，则全部显示', () => {
        wrapper = mount(Pagination, {
          propsData: {
            totalPage: 5,
            currentPage: 3,
            pageRange: 3
          }
        });
        let items = wrapper.findAll('[data-index]');
        expect(items.length).to.eq(7);
      });
    });
  });
  describe('events', () => {
    it('点击数值切换，触发 update:currentPage', done => {
      wrapper = mount(Pagination, {
        propsData: {
          totalPage: 4
        }
      });
      let vm = wrapper.vm;
      let callback = sinon.fake();
      vm.$on('update:currentPage', callback);
      let item1 = wrapper.find('[data-index="1"]');
      let item2 = wrapper.find('[data-index="2"]');
      item2.trigger('click');
      expect(callback).to.been.calledWith(2);
      vm.$nextTick(() => {
        expect(item1.classes()).to.not.contain('active');
        expect(item2.classes()).to.contain('active');
        done();
      });
    });
    it('点击左右切换，触发 update:currentPage', done => {
      wrapper = mount(Pagination, {
        propsData: {
          totalPage: 4
        }
      });
      let vm = wrapper.vm;
      let callback = sinon.fake();
      vm.$on('update:currentPage', callback);
      let item1 = wrapper.find('[data-index="1"]');
      let item2 = wrapper.find('[data-index="2"]');
      let prev = wrapper.find('[data-index="prev"');
      let next = wrapper.find('[data-index="next"');
      next.trigger('click');
      expect(callback).to.been.calledWith(2);
      vm.$nextTick(() => {
        expect(item1.classes()).to.not.contain('active');
        expect(item2.classes()).to.contain('active');
        prev.trigger('click');
        expect(callback).to.been.calledWith(1);
        vm.$nextTick(() => {
          expect(item1.classes()).to.contain('active');
          expect(item2.classes()).to.not.contain('active');
          done();
        });
      });
    });
  });
});
