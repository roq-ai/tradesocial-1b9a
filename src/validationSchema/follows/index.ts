import * as yup from 'yup';

export const followValidationSchema = yup.object().shape({
  follower_id: yup.string().nullable(),
  followee_id: yup.string().nullable(),
});
