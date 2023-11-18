declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    integer(): this;
  }
}
