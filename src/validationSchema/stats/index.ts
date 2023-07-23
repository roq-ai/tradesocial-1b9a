import * as yup from 'yup';

export const statsValidationSchema = yup.object().shape({
  gain: yup.number().integer().required(),
  fail_success_ratio: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
