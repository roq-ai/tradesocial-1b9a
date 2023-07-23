import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  bio: yup.string(),
  verified: yup.boolean().required(),
  user_id: yup.string().nullable(),
});
