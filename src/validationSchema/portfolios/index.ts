import * as yup from 'yup';

export const portfolioValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});
