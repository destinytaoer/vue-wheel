import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Icon from '@/Common/Icon';

describe('Icon', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Icon).to.be.ok;
  });
  describe('props', () => {
    it('设置 name.', () => {
      wrapper = shallowMount(Icon, {
        propsData: {
          name: 'settings'
        }
      });
      let use = wrapper.find('use');
      expect(use.attributes().href).to.eq('#i-settings');
    });
  });
});
