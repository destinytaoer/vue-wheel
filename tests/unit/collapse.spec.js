import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';
import Collapse from '@/Collapse/Collapse';
import CollapseItem from '@/Collapse/CollapseItem';
Vue.component('d-collapse', Collapse);
Vue.component('d-collapse-item', CollapseItem);

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Collapse', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Collapse).to.exist;
    expect(CollapseItem).to.exist;
  });
  describe('Collapse props', () => {
    it('可以设置 selected', done => {
      wrapper = mount(Collapse, {
        propsData: {
          selected: ['1']
        },
        slots: {
          default: `
        <d-collapse-item
          title="标题1"
          name="1"
        >内容1</d-collapse-item>
        <d-collapse-item
          title="标题2"
          name="2"
        >内容2</d-collapse-item>
        <d-collapse-item
          title="标题3"
          name="3"
        >内容3</d-collapse-item>`
        }
      });
      wrapper.vm.$nextTick(() => {
        let items = wrapper.findAll(CollapseItem);
        expect(items.at(0).classes()).to.not.contain('close');
        expect(items.at(1).classes()).to.contain('close');
        expect(items.at(2).classes()).to.contain('close');
        done();
      });
    });
    it('可以设置 single', done => {
      wrapper = mount(Collapse, {
        propsData: {
          selected: ['1'],
          single: true
        },
        slots: {
          default: `
            <d-collapse-item
              title="标题1"
              name="1"
            >内容1</d-collapse-item>
            <d-collapse-item
              title="标题2"
              name="2"
            >内容2</d-collapse-item>
            <d-collapse-item
              title="标题3"
              name="3"
            >内容3</d-collapse-item>`
        }
      });
      let items = wrapper.findAll(CollapseItem);
      items
        .at(1)
        .find('.title')
        .trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.selectedArr).to.contain('2');
        expect(wrapper.vm.selectedArr).to.not.contain('1');
        expect(items.at(0).classes()).to.contain('close');
        expect(items.at(1).classes()).to.not.contain('close');
        expect(items.at(2).classes()).to.contain('close');
        done();
      });
    });
  });
  describe('CollapseItem props', () => {
    it('可以设置 title', () => {
      wrapper = mount(Collapse, {
        propsData: {
          selected: []
        },
        slots: {
          default: `
            <d-collapse-item
              title="标题1"
              name="1"
            >内容1</d-collapse-item>`
        }
      });
      const item = wrapper.find(CollapseItem);
      expect(item.props('title')).to.eq('标题1');
    });
    it('可以设置 name', () => {
      wrapper = mount(Collapse, {
        propsData: {
          selected: []
        },
        slots: {
          default: `
            <d-collapse-item
              title="标题1"
              name="1"
            >内容1</d-collapse-item>`
        }
      });
      const item = wrapper.find(CollapseItem);
      expect(item.props('name')).to.eq('1');
    });
  });
  describe('events', () => {
    it('可以点开多个', done => {
      wrapper = mount(Collapse, {
        propsData: {
          selected: ['1']
        },
        slots: {
          default: `
            <d-collapse-item
              title="标题1"
              name="1"
            >内容1</d-collapse-item>
            <d-collapse-item
              title="标题2"
              name="2"
            >内容2</d-collapse-item>
            <d-collapse-item
              title="标题3"
              name="3"
            >内容3</d-collapse-item>`
        }
      });
      wrapper.vm.$nextTick(() => {
        let items = wrapper.findAll(CollapseItem);
        expect(items.at(0).classes()).to.not.contain('close');
        expect(items.at(1).classes()).to.contain('close');
        expect(items.at(2).classes()).to.contain('close');
        items
          .at(1)
          .find('.title')
          .trigger('click');
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.selectedArr).to.contain('2');
          expect(items.at(0).classes()).to.not.contain('close');
          expect(items.at(1).classes()).to.not.contain('close');
          expect(items.at(2).classes()).to.contain('close');
          done();
        });
      });
    });
  });
});
