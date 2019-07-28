import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Cascader from '@/Cascader/Cascader';
import CascaderItems from '@/Cascader/CascaderItems';

describe('Cascader', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Cascader).to.exist;
    expect(CascaderItems).to.exist;
  });
  describe('Cascader props', () => {
    it('必须设置 source', () => {
      wrapper = mount(Cascader, {
        propsData: {
          source: [
            {
              name: '广东',
              children: [
                {
                  name: '广州',
                  children: [
                    { name: '天河' },
                    { name: '越秀' },
                    { name: '黄埔' },
                    { name: '花都' },
                    { name: '白云' },
                    { name: '番禺' }
                  ]
                },
                {
                  name: '深圳',
                  children: [
                    { name: '南山' },
                    { name: '罗湖' },
                    { name: '福田' },
                    { name: '龙华' },
                    { name: '龙岗' },
                    { name: '光明' },
                    { name: '大鹏' },
                    { name: '宝安' }
                  ]
                },
                {
                  name: '梅州',
                  children: [
                    { name: '兴宁' },
                    { name: '梅县' },
                    { name: '平远' },
                    { name: '五华' },
                    { name: '大浦' }
                  ]
                }
              ]
            }
          ],
          selected: []
        }
      });
      let label = wrapper.find('.label');
      expect(label.text()).to.eq('广东');
    });
    it('必须设置 selected', () => {
      wrapper = mount(Cascader, {
        propsData: {
          source: [
            {
              name: '广东',
              children: [
                {
                  name: '广州',
                  children: [
                    { name: '天河' },
                    { name: '越秀' },
                    { name: '黄埔' },
                    { name: '花都' },
                    { name: '白云' },
                    { name: '番禺' }
                  ]
                },
                {
                  name: '深圳',
                  children: [
                    { name: '南山' },
                    { name: '罗湖' },
                    { name: '福田' },
                    { name: '龙华' },
                    { name: '龙岗' },
                    { name: '光明' },
                    { name: '大鹏' },
                    { name: '宝安' }
                  ]
                },
                {
                  name: '梅州',
                  children: [
                    { name: '兴宁' },
                    { name: '梅县' },
                    { name: '平远' },
                    { name: '五华' },
                    { name: '大浦' }
                  ]
                }
              ]
            }
          ],
          selected: [
            {
              name: '广东'
            }
          ]
        }
      });
      let trigger = wrapper.find('.cascader-trigger');
      expect(trigger.text()).to.eq('广东');
    });
    it('可以设置 split', () => {
      wrapper = mount(Cascader, {
        propsData: {
          source: [
            {
              name: '广东',
              children: [
                {
                  name: '广州',
                  children: [
                    { name: '天河' },
                    { name: '越秀' },
                    { name: '黄埔' },
                    { name: '花都' },
                    { name: '白云' },
                    { name: '番禺' }
                  ]
                },
                {
                  name: '深圳',
                  children: [
                    { name: '南山' },
                    { name: '罗湖' },
                    { name: '福田' },
                    { name: '龙华' },
                    { name: '龙岗' },
                    { name: '光明' },
                    { name: '大鹏' },
                    { name: '宝安' }
                  ]
                },
                {
                  name: '梅州',
                  children: [
                    { name: '兴宁' },
                    { name: '梅县' },
                    { name: '平远' },
                    { name: '五华' },
                    { name: '大浦' }
                  ]
                }
              ]
            }
          ],
          selected: [
            {
              name: '广东'
            },
            {
              name: '广州'
            }
          ]
        }
      });
      let trigger = wrapper.find('.cascader-trigger');
      expect(trigger.text()).to.eq('广东 / 广州');
      wrapper = mount(Cascader, {
        propsData: {
          source: [
            {
              name: '广东',
              children: [
                {
                  name: '广州',
                  children: [
                    { name: '天河' },
                    { name: '越秀' },
                    { name: '黄埔' },
                    { name: '花都' },
                    { name: '白云' },
                    { name: '番禺' }
                  ]
                },
                {
                  name: '深圳',
                  children: [
                    { name: '南山' },
                    { name: '罗湖' },
                    { name: '福田' },
                    { name: '龙华' },
                    { name: '龙岗' },
                    { name: '光明' },
                    { name: '大鹏' },
                    { name: '宝安' }
                  ]
                },
                {
                  name: '梅州',
                  children: [
                    { name: '兴宁' },
                    { name: '梅县' },
                    { name: '平远' },
                    { name: '五华' },
                    { name: '大浦' }
                  ]
                }
              ]
            }
          ],
          selected: [
            {
              name: '广东'
            },
            {
              name: '广州'
            }
          ],
          split: '-'
        }
      });
      trigger = wrapper.find('.cascader-trigger');
      expect(trigger.text()).to.eq('广东 - 广州');
    });
    it('可以设置 placeholder', () => {
      wrapper = mount(Cascader, {
        propsData: {
          source: [],
          selected: []
        }
      });
      let placeholder = wrapper.find('.placeholder');
      expect(placeholder.text()).to.eq('');
      wrapper = mount(Cascader, {
        propsData: {
          source: [],
          selected: [],
          placeholder: 'xxx'
        }
      });
      placeholder = wrapper.find('.placeholder');
      expect(placeholder.text()).to.eq('xxx');
    });
    xit('可以设置 loadData', () => {
      wrapper = mount(Cascader, {
        propsData: {
          source: [
            {
              name: '广东',
              children: [
                {
                  name: '广州',
                  children: [
                    { name: '天河' },
                    { name: '越秀' },
                    { name: '黄埔' },
                    { name: '花都' },
                    { name: '白云' },
                    { name: '番禺' }
                  ]
                },
                {
                  name: '深圳',
                  children: [
                    { name: '南山' },
                    { name: '罗湖' },
                    { name: '福田' },
                    { name: '龙华' },
                    { name: '龙岗' },
                    { name: '光明' },
                    { name: '大鹏' },
                    { name: '宝安' }
                  ]
                },
                {
                  name: '梅州',
                  children: [
                    { name: '兴宁' },
                    { name: '梅县' },
                    { name: '平远' },
                    { name: '五华' },
                    { name: '大浦' }
                  ]
                }
              ]
            }
          ],
          selected: []
        }
      });
      let label = wrapper.find('.label');
      expect(label.text()).to.eq('广东');
    });
  });
  describe('CascaderItems props', () => {
    it('可以设置 level', () => {
      wrapper = mount(Cascader, {
        propsData: {
          source: [
            {
              name: '广东',
              children: [
                {
                  name: '广州',
                  children: [
                    { name: '天河' },
                    { name: '越秀' },
                    { name: '黄埔' },
                    { name: '花都' },
                    { name: '白云' },
                    { name: '番禺' }
                  ]
                },
                {
                  name: '深圳',
                  children: [
                    { name: '南山' },
                    { name: '罗湖' },
                    { name: '福田' },
                    { name: '龙华' },
                    { name: '龙岗' },
                    { name: '光明' },
                    { name: '大鹏' },
                    { name: '宝安' }
                  ]
                },
                {
                  name: '梅州',
                  children: [
                    { name: '兴宁' },
                    { name: '梅县' },
                    { name: '平远' },
                    { name: '五华' },
                    { name: '大浦' }
                  ]
                }
              ]
            }
          ],
          selected: []
        }
      });
      let item = wrapper.find(CascaderItems);
      expect(item.props('level')).to.eq(0);
    });
  });
  describe('Cascader events', () => {
    it('点击 trigger 显示/隐藏弹框，触发 show/hide', done => {
      wrapper = mount(Cascader, {
        propsData: {
          source: [
            {
              name: '广东',
              children: [
                {
                  name: '广州',
                  children: [
                    { name: '天河' },
                    { name: '越秀' },
                    { name: '黄埔' },
                    { name: '花都' },
                    { name: '白云' },
                    { name: '番禺' }
                  ]
                },
                {
                  name: '深圳',
                  children: [
                    { name: '南山' },
                    { name: '罗湖' },
                    { name: '福田' },
                    { name: '龙华' },
                    { name: '龙岗' },
                    { name: '光明' },
                    { name: '大鹏' },
                    { name: '宝安' }
                  ]
                },
                {
                  name: '梅州',
                  children: [
                    { name: '兴宁' },
                    { name: '梅县' },
                    { name: '平远' },
                    { name: '五华' },
                    { name: '大浦' }
                  ]
                }
              ]
            }
          ],
          selected: []
        }
      });
      let cascader = wrapper.vm;
      let trigger = wrapper.find('.cascader-trigger');
      let popover = wrapper.find('.cascader-popover');
      expect(popover.element.style.display).to.eq('none');
      let callback1 = sinon.fake();
      let callback2 = sinon.fake();
      cascader.$on('show', callback1);
      cascader.$on('hide', callback2);
      trigger.trigger('click');
      expect(callback1).to.been.called;
      cascader.$nextTick(() => {
        expect(popover.element.style.display).to.eq('');
        trigger.trigger('click');
        cascader.$nextTick(() => {
          expect(popover.element.style.display).to.eq('none');
          expect(callback2).to.been.called;
          done();
        });
      });
    });
  });
  describe('CascaderItems events', () => {
    xit('点击 label 显示下一级列表，trigger 显示结果', done => {
      wrapper = mount(Cascader, {
        propsData: {
          source: [
            {
              name: '广东',
              children: [
                {
                  name: '广州',
                  children: [
                    { name: '天河' },
                    { name: '越秀' },
                    { name: '黄埔' },
                    { name: '花都' },
                    { name: '白云' },
                    { name: '番禺' }
                  ]
                },
                {
                  name: '深圳',
                  children: [
                    { name: '南山' },
                    { name: '罗湖' },
                    { name: '福田' },
                    { name: '龙华' },
                    { name: '龙岗' },
                    { name: '光明' },
                    { name: '大鹏' },
                    { name: '宝安' }
                  ]
                },
                {
                  name: '梅州',
                  children: [
                    { name: '兴宁' },
                    { name: '梅县' },
                    { name: '平远' },
                    { name: '五华' },
                    { name: '大浦' }
                  ]
                }
              ]
            }
          ],
          selected: []
        }
      });
      let cascader = wrapper.vm;
      let trigger = wrapper.find('.cascader-trigger');
      let items = wrapper.findAll(CascaderItems);
      expect(items.length).to.eq(1);
      trigger.trigger('click');
      cascader.$nextTick(() => {
        let label = popover.find('.label');
        label.trigger('click');
        cascader.$nextTick(() => {
          expect(trigger.text()).to.eq('广东');
          expect(label.classes()).to.contain('active');
          items = wrapper.findAll(CascaderItems);
          expect(items.length).to.eq(2);
          done();
        }, 1000);
      });
    });
  });
});
