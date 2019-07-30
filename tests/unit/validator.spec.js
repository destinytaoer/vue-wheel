import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import validate from '@/Validator/Validator';

describe('validate', () => {
  it('存在', () => {
    expect(validate).to.exist;
  });
  describe('test required', () => {
    it("string ''", () => {
      let data = {
        email: ''
      };
      let rules = [{ key: 'email', required: true }];
      let errors = validate(data, rules);
      expect(errors.email.required).to.eq('必填');
    });
    it('number 0', () => {
      let data = {
        email: 0
      };
      let rules = [{ key: 'email', required: true }];
      let errors = validate(data, rules);
      expect(errors.email).to.not.exist;
    });
  });
  describe('test custom pattern', () => {
    it('@test.com 报错', () => {
      let data = {
        email: '@test.com'
      };
      let rules = [{ key: 'email', pattern: /^.+@.+$/ }];
      let errors = validate(data, rules);
      expect(errors.email.pattern).to.eq('格式不正确');
    });
    it('1@test.com 通过', () => {
      let data = {
        email: '1@test.com'
      };
      let rules = [{ key: 'email', pattern: /^.+@.+$/ }];
      let errors = validate(data, rules);
      expect(errors.email).to.not.exist;
    });
  });
  describe('test email pattern', () => {
    it('@test.com 报错', () => {
      let data = {
        email: '@test.com'
      };
      let rules = [{ key: 'email', pattern: 'email' }];
      let errors = validate(data, rules);
      expect(errors.email.pattern).to.eq('格式不正确');
    });
    it('1@test.com 通过', () => {
      let data = {
        email: '1@test.com'
      };
      let rules = [{ key: 'email', pattern: 'email' }];
      let errors = validate(data, rules);
      expect(errors.email).to.not.exist;
    });
    it('required & pattern', () => {
      let data = {
        email: ''
      };
      let rules = [{ key: 'email', pattern: 'email', required: true }];
      let errors = validate(data, rules);
      expect(errors.email.required).to.exist;
      expect(errors.email.pattern).to.not.exist;
    });
  });
  describe('test minLength 6', () => {
    it('xx 报错', () => {
      let data = {
        email: 'xx'
      };
      let rules = [{ key: 'email', minLength: 6 }];
      let errors = validate(data, rules);
      expect(errors.email.minLength).to.exist;
    });
    it('xxxxxx 通过', () => {
      let data = {
        email: 'xxxxxx'
      };
      let rules = [{ key: 'email', minLength: 6 }];
      let errors = validate(data, rules);
      expect(errors.email).to.not.exist;
    });
    it('minLength & pattern', () => {
      let data = {
        email: 'xxx'
      };
      let rules = [{ key: 'email', minLength: 6, pattern: 'email' }];
      let errors = validate(data, rules);
      expect(errors.email.minLength).to.exist;
      expect(errors.email.pattern).to.exist;
    });
  });
  describe('test maxLength 6', () => {
    it('xxxxxxxx 报错', () => {
      let data = {
        email: 'xxxxxxxxx'
      };
      let rules = [{ key: 'email', maxLength: 6 }];
      let errors = validate(data, rules);
      expect(errors.email.maxLength).to.exist;
    });
    it('xxx 通过', () => {
      let data = {
        email: 'xxx'
      };
      let rules = [{ key: 'email', maxLength: 6 }];
      let errors = validate(data, rules);
      expect(errors.email).to.not.exist;
    });
    it('maxLength & minLength & pattern', () => {
      let data = {
        email: 'xxxsssssssssssss'
      };
      let rules = [
        { key: 'email', maxLength: 10, minLength: 0, pattern: 'email' }
      ];
      let errors = validate(data, rules);
      expect(errors.email.minLength).to.not.exist;
      expect(errors.email.maxLength).to.exist;
      expect(errors.email.pattern).to.exist;
    });
  });
  describe('test custom rules', () => {
    it('不存在的校验器会报错', () => {
      let data = {
        email: 'xxx'
      };
      let rules = [
        {
          key: 'email',
          hasNumber: true
        }
      ];
      let fn = () => {
        validate(data, rules);
      };
      expect(fn).to.throw();
    });
    it('添加校验器之后通过', () => {
      let data = {
        email: 'xxx'
      };
      let rules = [
        {
          key: 'email',
          hasNumber: true
        }
      ];
      validate.hasNumber = (val, hasNumber) => {
        if (!hasNumber) return;
        if (!/\d/.test(val)) {
          return '必须包含数字';
        }
      };
      let errors;
      let fn = () => {
        errors = validate(data, rules);
      };
      expect(fn).to.not.throw();
      expect(errors.email.hasNumber).to.eq('必须包含数字');
    });
  });
});
