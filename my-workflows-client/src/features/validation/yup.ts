import * as yup from "yup";

declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    integer(): this;
  }
}

yup.StringSchema.prototype.integer = function () {
  return this.matches(/^\d+$/, 'The field should have digits only')
}

export default yup;