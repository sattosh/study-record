import { FormLabel, TextField, TextFieldProps, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export type InputTextProps = {
  /** formの要素名 */
  name: string;
  /** デフォルト値 */
  defaultValue?: string;
  /** 無効化 */
  disabled?: boolean;
  /** フォームにつける命名 */
  formLabel?: string;
} & TextFieldProps;

/** フォーム用テキスト入力欄 */
export const InputText = ({ name, defaultValue, disabled, formLabel, ...textFieldProps }: InputTextProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      disabled={!!disabled}
      control={control}
      render={({ field, fieldState }) => (
        <>
          {formLabel ? (
            <FormLabel>
              <Typography variant="h6">{formLabel}</Typography>
              <TextField {...field} {...textFieldProps} helperText={fieldState.error?.message} error={fieldState.invalid} />
            </FormLabel>
          ) : (
            <TextField {...field} {...textFieldProps} helperText={fieldState.error?.message} error={fieldState.invalid} />
          )}
        </>
      )}
    />
  );
};
