import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createStats } from 'apiSdk/stats';
import { statsValidationSchema } from 'validationSchema/stats';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { StatsInterface } from 'interfaces/stats';

function StatsCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: StatsInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createStats(values);
      resetForm();
      router.push('/stats');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<StatsInterface>({
    initialValues: {
      gain: 0,
      fail_success_ratio: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: statsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Stats',
              link: '/stats',
            },
            {
              label: 'Create Stats',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Stats
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Gain"
            formControlProps={{
              id: 'gain',
              isInvalid: !!formik.errors?.gain,
            }}
            name="gain"
            error={formik.errors?.gain}
            value={formik.values?.gain}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('gain', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Fail Success Ratio"
            formControlProps={{
              id: 'fail_success_ratio',
              isInvalid: !!formik.errors?.fail_success_ratio,
            }}
            name="fail_success_ratio"
            error={formik.errors?.fail_success_ratio}
            value={formik.values?.fail_success_ratio}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('fail_success_ratio', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/stats')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'stats',
    operation: AccessOperationEnum.CREATE,
  }),
)(StatsCreatePage);
