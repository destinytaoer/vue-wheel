import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';
import Nav from '@/Nav/Nav';
import NavItem from '@/Nav/NavItem';
import NavSubItem from '@/Nav/NavSubItem';

Vue.component('d-nav', Nav);
Vue.component('d-nav-item', NavItem);
Vue.component('d-nav-sub-item', NavSubItem);

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Nav', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Nav).to.exist;
    expect(NavItem).to.exist;
    expect(NavSubItem).to.exist;
  });
  describe('Nav props', () => {
    it('默认不选中任何项', () => {
      wrapper = mount(Nav, {
        slots: {
          default: `
            <d-nav-item name="home">首页</d-nav-item>
            <d-nav-item name="start">开始</d-nav-item>
            <d-nav-item name="about">关于</d-nav-item>
          `
        }
      });
      let items = wrapper.findAll(NavItem);
      expect(items.at(0).classes()).to.not.contain('active');
      expect(items.at(1).classes()).to.not.contain('active');
      expect(items.at(2).classes()).to.not.contain('active');
    });
    xit('默认竖向只能展开一项', done => {
      wrapper = mount(Nav, {
        propsData: {
          vertical: true
        },
        slots: {
          default: `
            <d-nav-item name="home">首页</d-nav-item>
            <d-nav-sub-item title="开始">
              <d-nav-item name="components">组件</d-nav-item>
              <d-nav-item name="install">安装</d-nav-item>
            </d-nav-sub-item>
            <d-nav-sub-item title="关于">
              <d-nav-item name="culture">企业文化</d-nav-item>
              <d-nav-item name="developers">开发团队</d-nav-item>
            </d-nav-sub-item>
          `
        }
      });
      let vm = wrapper.vm;
      let subItems = wrapper.findAll(NavSubItem);
      let subItem1 = subItems.at(0);
      let subItem2 = subItems.at(1);
      let subTitle1 = subItem1.find('.nav-sub-item-title');
      let subPopover1 = subItem1.find('.nav-sub-item-popover');
      let subTitle2 = subItem2.find('.nav-sub-item-title');
      let subPopover2 = subItem2.find('.nav-sub-item-popover');
      expect(subPopover1.element.style.display).to.eq('none');
      expect(subPopover2.element.style.display).to.eq('none');
      subTitle1.trigger('click');
      vm.$nextTick(() => {
        expect(subPopover1.element.style.display).to.eq('');
        subTitle2.trigger('click');
        vm.$nextTick(() => {
          setTimeout(() => {
            expect(subPopover1.element.style.display).to.eq('none');
            expect(subPopover2.element.style.display).to.eq('');
            done();
          }, 250);
        });
      });
    });
    it('可以设置 selected 属性', () => {
      wrapper = mount(Nav, {
        propsData: {
          selected: 'home'
        },
        slots: {
          default: `
            <d-nav-item name="home">首页</d-nav-item>
            <d-nav-item name="start">开始</d-nav-item>
            <d-nav-item name="about">关于</d-nav-item>
          `
        }
      });
      let items = wrapper.findAll(NavItem);
      expect(items.at(0).classes()).to.contain('active');
      expect(items.at(1).classes()).to.not.contain('active');
      expect(items.at(2).classes()).to.not.contain('active');
    });
    it('可以设置 vertical 属性', () => {
      wrapper = mount(Nav, {
        propsData: {
          vertical: true
        },
        slots: {
          default: `
            <d-nav-item name="home">首页</d-nav-item>
            <d-nav-item name="start">开始</d-nav-item>
            <d-nav-sub-item title="关于">
              <d-nav-item name="culture">企业文化</d-nav-item>
              <d-nav-item name="developers">开发团队</d-nav-item>
            </d-nav-sub-item>
          `
        }
      });
      let item = wrapper.find(NavItem);
      let subItem = wrapper.find(NavSubItem);
      expect(wrapper.classes()).to.contain('vertical');
      expect(item.classes()).to.contain('vertical');
      expect(subItem.classes()).to.contain('vertical');
    });
    xit('可以设置 multiple 属性', () => {
      wrapper = mount(Nav, {
        propsData: {
          multiple: true
        },
        slots: {
          default: `
            <d-nav-item name="home">首页</d-nav-item>
            <d-nav-item name="start">开始</d-nav-item>
            <d-nav-sub-item title="关于">
              <d-nav-item name="culture">企业文化</d-nav-item>
              <d-nav-item name="developers">开发团队</d-nav-item>
            </d-nav-sub-item>
          `
        }
      });
      let vm = wrapper.vm;
      let subItems = wrapper.findAll(NavSubItem);
      let subItem1 = subItems.at(0);
      let subItem2 = subItems.at(1);
      let subTitle1 = subItem1.find('.nav-sub-item-title');
      let subPopover1 = subItem1.find('.nav-sub-item-popover');
      let subTitle2 = subItem2.find('.nav-sub-item-title');
      let subPopover2 = subItem2.find('.nav-sub-item-popover');
      expect(subPopover1.element.style.display).to.eq('none');
      expect(subPopover2.element.style.display).to.eq('none');
      subTitle1.trigger('click');
      vm.$nextTick(() => {
        expect(subPopover1.element.style.display).to.eq('');
        subTitle2.trigger('click');
        vm.$nextTick(() => {
          setTimeout(() => {
            expect(subPopover1.element.style.display).to.eq('');
            expect(subPopover2.element.style.display).to.eq('');
            done();
          }, 250);
        });
      });
    });
  });
  describe('NavItem props', () => {
    it('可以设置 name 属性', () => {
      wrapper = mount(Nav, {
        slots: {
          default: `
            <d-nav-item name="home">首页</d-nav-item>
            <d-nav-item name="start">开始</d-nav-item>
            <d-nav-item name="about">关于</d-nav-item>
          `
        }
      });
      let items = wrapper.findAll(NavItem);
      expect(items.at(0).props('name')).to.eq('home');
      expect(items.at(1).props('name')).to.eq('start');
      expect(items.at(2).props('name')).to.eq('about');
    });
  });
  describe('NavSubItem props', () => {
    it('可以设置 title 属性', () => {
      wrapper = mount(Nav, {
        slots: {
          default: `
            <d-nav-item name="home">首页</d-nav-item>
            <d-nav-item name="start">开始</d-nav-item>
            <d-nav-sub-item title="关于">
              <d-nav-item name="culture">企业文化</d-nav-item>
              <d-nav-item name="developers">开发团队</d-nav-item>
            </d-nav-sub-item>
          `
        }
      });
      let subItem = wrapper.find(NavSubItem);
      expect(subItem.find('.nav-sub-item-title').text()).to.eq('关于');
    });
  });
  describe('events', () => {
    it('横向 Nav 鼠标滑入展开', done => {
      wrapper = mount(Nav, {
        slots: {
          default: `
            <d-nav-item name="home">首页</d-nav-item>
            <d-nav-item name="start">开始</d-nav-item>
            <d-nav-sub-item title="关于">
              <d-nav-item name="culture">企业文化</d-nav-item>
              <d-nav-item name="developers">开发团队</d-nav-item>
            </d-nav-sub-item>
          `
        }
      });
      let vm = wrapper.vm;
      let subItem = wrapper.find(NavSubItem);
      let subPopover = subItem.find('.nav-sub-item-popover');
      expect(subPopover.element.style.display).to.eq('none');
      subItem.trigger('mouseenter');
      vm.$nextTick(() => {
        expect(subPopover.element.style.display).to.eq('');
        done();
      });
    });
    it('竖向 Nav 点击展开', done => {
      wrapper = mount(Nav, {
        propsData: {
          vertical: true
        },
        slots: {
          default: `
            <d-nav-item name="home">首页</d-nav-item>
            <d-nav-item name="start">开始</d-nav-item>
            <d-nav-sub-item title="关于">
              <d-nav-item name="culture">企业文化</d-nav-item>
              <d-nav-item name="developers">开发团队</d-nav-item>
            </d-nav-sub-item>
          `
        }
      });
      let vm = wrapper.vm;
      let subItem = wrapper.find(NavSubItem);
      let subTitle = wrapper.find('.nav-sub-item-title');
      let subPopover = subItem.find('.nav-sub-item-popover');
      expect(subPopover.element.style.display).to.eq('none');
      subTitle.trigger('click');
      vm.$nextTick(() => {
        expect(subPopover.element.style.display).to.eq('');
        done();
      });
    });
    it('点击 item 选中，触发 update:selected', done => {
      wrapper = mount(Nav, {
        slots: {
          default: `
            <d-nav-item name="home">首页</d-nav-item>
            <d-nav-item name="start">开始</d-nav-item>
            <d-nav-sub-item title="关于">
              <d-nav-item name="culture">企业文化</d-nav-item>
              <d-nav-item name="developers">开发团队</d-nav-item>
            </d-nav-sub-item>
          `
        }
      });
      let vm = wrapper.vm;
      let items = wrapper.findAll(NavItem);
      let callback = sinon.fake();
      vm.$on('update:selected', callback);
      items.at(0).trigger('click');
      vm.$nextTick(() => {
        expect(callback).to.been.calledWith('home');
        expect(items.at(0).classes()).to.contain('active');
        items.at(1).trigger('click');
        vm.$nextTick(() => {
          expect(callback).to.been.calledWith('start');
          expect(items.at(0).classes()).to.not.contain('active');
          expect(items.at(1).classes()).to.contain('active');
          done();
        });
      });
    });
  });
});
