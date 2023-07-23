import * as yup from 'yup';

export const chartValidationSchema = yup.object().shape({
  simulation: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
