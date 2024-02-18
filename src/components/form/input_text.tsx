import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

export type TextInputProps = {
  /** formの要素名 */
  name: string;
  /** デフォルト値 */
  defaultValue?: string;
  /** 無効化 */
  disabled?: boolean;
} & TextFieldProps;

/** フォーム用テキスト入力欄 */
export const TextInput = ({ name, defaultValue, disabled, ...textFieldProps }: TextInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      disabled={!!disabled}
      control={control}
      render={({ field, fieldState }) => (
        <TextField {...field} {...textFieldProps} helperText={fieldState.error?.message} error={fieldState.invalid} />
      )}
    />
  );
};
