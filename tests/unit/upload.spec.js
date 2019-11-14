import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import { shallowMount, mount } from '@vue/test-utils';
import Button from '@/Button/Button';
import Icon from '@/Common/Icon';
import Upload from '@/Upload/Upload';
// describe 和 it 是 mocha 的 API
describe('Upload', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  it('存在.', () => {
    expect(Upload).to.be.ok;
  });
  describe('props', () => {});
  describe('events', () => {});
});
