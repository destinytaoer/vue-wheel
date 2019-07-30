class Validator {
  constructor() {}
  static add(name, fn) {
    this.prototype[name] = fn;
  }
  validate(data, rules) {
    let errors = {};

    rules.forEach(rule => {
      let key = rule.key;
      let val = data[key];
      let required = rule.required;
      let msg = rule.message;

      if (required) {
        let error = this.required(val);
        if (error) {
          ensureObject(errors, key);
          errors[key].required = msg || error;
          return;
        }
      }

      // 寻找所有 key，除了 key、required、message
      let validators = Object.keys(rule).filter(key => {
        let keys = ['key', 'required', 'message'];
        return !keys.includes(key);
      });
      validators.forEach(validator => {
        if (!this[validator]) throw `不存在校验器 ${validator}`;
        let ruleVal = rule[validator];
        if (ruleVal) {
          let error = this[validator](val, ruleVal);
          if (error) {
            ensureObject(errors, key);
            errors[key][validator] = msg || error;
          }
        }
      });
    });

    return errors;
  }
  required(value) {
    if (value !== 0 && !value) {
      return '必填';
    }
  }
  patterns = {
    email: /^.+@.+$/
  };
  pattern(value, pattern) {
    if (typeof pattern === 'string') {
      let old = pattern;
      pattern = this.patterns[old];
      if (!pattern) {
        throw new error(`${old} is not built-in`);
      }
    }
    if (!pattern.test(value)) {
      return '格式不正确';
    }
  }
  minLength(value, minLength) {
    if (value.length < minLength) {
      return `至少是${minLength}位`;
    }
  }
  maxLength(value, maxLength) {
    if (value.length > maxLength) {
      return `至少是${maxLength}位`;
    }
  }
}

function ensureObject(obj, key) {
  if (typeof obj[key] !== 'object') {
    obj[key] = {};
  }
}

export default Validator;
