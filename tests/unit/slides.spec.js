import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';
import Slides from '@/Slides/Slides';
import SlidesItem from '@/Slides/SlidesItem';

Vue.component('d-slides', Slides);
Vue.component('d-slides-item', SlidesItem);

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Slides', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Slides).to.exist;
    expect(SlidesItem).to.exist;
  });
  describe('Slides props', () => {
    it('默认展示第一个', done => {
      wrapper = mount(Slides, {
        propsData: {
          autoPlay: false
        },
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        }
      });
      let vm = wrapper.vm;
      vm.$nextTick(() => {
        let items = wrapper.findAll('.slides-item');
        let first = items.at(0).element;
        let second = items.at(1).element;
        let third = items.at(2).element;
        expect(first.style.display).to.eq('');
        expect(second.style.display).to.eq('none');
        expect(third.style.display).to.eq('none');
        let dot = wrapper.find('[data-index="0"]');
        expect(dot.classes()).to.contain('active');
        done();
      });
    });
    it('可以设置 selected 属性', done => {
      wrapper = mount(Slides, {
        propsData: {
          autoPlay: false,
          selected: '2'
        },
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        }
      });
      let vm = wrapper.vm;
      vm.$nextTick(() => {
        let items = wrapper.findAll('.slides-item');
        let first = items.at(0).element;
        let second = items.at(1).element;
        let third = items.at(2).element;
        expect(first.style.display).to.eq('none');
        expect(second.style.display).to.eq('');
        expect(third.style.display).to.eq('none');
        let dot = wrapper.find('[data-index="1"]');
        expect(dot.classes()).to.contain('active');
        done();
      });
    });
    it('可以自动播放', done => {
      wrapper = mount(Slides, {
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        }
      });
      let vm = wrapper.vm;
      vm.$nextTick(() => {
        let items = wrapper.findAll('.slides-item');
        let first = items.at(0).element;
        let second = items.at(1).element;
        let third = items.at(2).element;
        expect(first.style.display).to.eq('');
        expect(second.style.display).to.eq('none');
        expect(third.style.display).to.eq('none');
        let dot = wrapper.find('[data-index="0"]');
        expect(dot.classes()).to.contain('active');
        setTimeout(() => {
          expect(first.style.display).to.eq('none');
          expect(second.style.display).to.eq('');
          expect(third.style.display).to.eq('none');
          let dot = wrapper.find('[data-index="1"]');
          expect(dot.classes()).to.contain('active');
          done();
        }, 1100);
      });
    });
    it('可以设置delay', done => {
      wrapper = mount(Slides, {
        propsData: {
          delay: 500
        },
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        }
      });
      let vm = wrapper.vm;
      vm.$nextTick(() => {
        let items = wrapper.findAll('.slides-item');
        let first = items.at(0).element;
        let second = items.at(1).element;
        let third = items.at(2).element;
        expect(first.style.display).to.eq('');
        expect(second.style.display).to.eq('none');
        expect(third.style.display).to.eq('none');
        let dot = wrapper.find('[data-index="0"]');
        expect(dot.classes()).to.contain('active');
        setTimeout(() => {
          expect(first.style.display).to.eq('none');
          expect(second.style.display).to.eq('');
          expect(third.style.display).to.eq('none');
          let dot = wrapper.find('[data-index="1"]');
          expect(dot.classes()).to.contain('active');
          done();
        }, 600);
      });
    });
    it('默认展示 dots、arrow、dotsNum', () => {
      wrapper = mount(Slides, {
        propsData: {
          autoPlay: false
        },
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        }
      });
      let dotsWrapper = wrapper.find('.slides-dots');
      let arrows = wrapper.find('.slides-arrows');
      let dots = wrapper.findAll('.dot');
      expect(dotsWrapper.exists()).to.be.true;
      expect(arrows.exists()).to.be.true;
      expect(dots.at(0).text()).to.eq('1');
      expect(dots.at(1).text()).to.eq('2');
      expect(dots.at(2).text()).to.eq('3');
    });
    it('可以设置 enabledDots', () => {
      wrapper = mount(Slides, {
        propsData: {
          enabledDots: false,
          autoPlay: false
        },
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        }
      });
      let dots = wrapper.find('.slides-dots');
      expect(dots.exists()).to.not.be.true;
    });
    it('可以设置 enabledArrows', () => {
      wrapper = mount(Slides, {
        propsData: {
          enabledArrows: false,
          autoPlay: false
        },
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        }
      });
      let arrows = wrapper.find('.slides-arrows');
      expect(arrows.exists()).to.not.be.true;
    });
    it('可以设置 showDotsNum', () => {
      wrapper = mount(Slides, {
        propsData: {
          showDotsNum: false,
          autoPlay: false
        },
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        }
      });
      let dots = wrapper.findAll('.dot');
      expect(dots.at(0).text()).to.eq('');
      expect(dots.at(1).text()).to.eq('');
      expect(dots.at(2).text()).to.eq('');
    });
  });
  describe('SlidesItem props', () => {
    it('可以设置 name 属性', done => {
      wrapper = mount(Slides, {
        propsData: {
          autoPlay: false
        },
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        }
      });
      let vm = wrapper.vm;
      vm.$nextTick(() => {
        let items = wrapper.findAll(SlidesItem);
        let first = items.at(0);
        let second = items.at(1);
        let third = items.at(2);
        expect(first.props().name).to.eq('1');
        expect(second.props().name).to.eq('2');
        expect(third.props().name).to.eq('3');
        done();
      });
    });
  });
  describe('events', () => {
    it('点击 dots 切换', done => {
      wrapper = mount(Slides, {
        propsData: {
          autoPlay: false
        },
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        }
      });
      let vm = wrapper.vm;
      let dot = wrapper.find('[data-index="1"]');
      vm.$nextTick(() => {
        let items = wrapper.findAll('.slides-item');
        let first = items.at(0).element;
        let second = items.at(1).element;
        let third = items.at(2).element;
        expect(first.style.display).to.eq('');
        expect(second.style.display).to.eq('none');
        expect(third.style.display).to.eq('none');
        dot.trigger('click');
        setTimeout(() => {
          expect(first.style.display).to.eq('none');
          expect(second.style.display).to.eq('');
          expect(third.style.display).to.eq('none');
          done();
        }, 1100);
      });
    });
    it('切换触发 update:selected', done => {
      wrapper = mount(Slides, {
        propsData: {
          autoPlay: false
        },
        slots: {
          default: `
            <d-slides-item name="1">
              <div class="box">1</div>
            </d-slides-item>
            <d-slides-item name="2">
              <div class="box">2</div>
            </d-slides-item>
            <d-slides-item name="3">
              <div class="box">3</div>
            </d-slides-item>
          `
        },
        listeners: {
          'update:selected': selected => {
            expect(selected).to.eq('2');
            done();
          }
        }
      });
      let vm = wrapper.vm;
      let dot = wrapper.find('[data-index="1"]');
      vm.$nextTick(() => {
        dot.trigger('click');
      });
    });
  });
});
