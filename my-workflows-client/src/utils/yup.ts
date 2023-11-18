import * as yup from "yup";

yup.addMethod(yup.string, 'integer', function () {
  return this.matches(/^\d+$/, 'The field should have digits only')
})