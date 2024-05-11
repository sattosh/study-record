import React from 'react';

import { UseFormReturn, FormProvider as HookFormProvider } from 'react-hook-form';
import { AnyDictionary } from '../../models';

export type FormProviderProps<T extends AnyDictionary> = {
  children: React.ReactNode;
  form: UseFormReturn<T>;
};

export const FormProvider = <T extends AnyDictionary>(props: FormProviderProps<T>): JSX.Element => {
  const { form, children } = props;
  // eslint-disable-next-line
  return <HookFormProvider {...form}>{children}</HookFormProvider>;
};

export type FormProps<T extends AnyDictionary> = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<T, any, T>;
} & React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export const Form = <T extends AnyDictionary>(props: FormProps<T>): JSX.Element => {
  const { form, children, ...rest } = props;
  return (
    <FormProvider form={form}>
      {/* eslint-disable-next-line */}
      <form {...rest}>{children}</form>
    </FormProvider>
  );
};
