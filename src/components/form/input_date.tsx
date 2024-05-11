import { useFormContext, Controller } from 'react-hook-form';
import { DateTime } from 'luxon';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { FormControl, FormHelperText, FormLabel, Typography } from '@mui/material';

export type InputDateProps = {
  name: string;
  disabled?: boolean;
  defaultValue?: DateTime<true>;
  /** フォームにつける命名 */
  formLabel?: string;
} & DatePickerProps<DateTime>;

export const InputDate = ({ name, disabled, defaultValue, formLabel, ...datePickerProps }: InputDateProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={fieldState.invalid}>
          {formLabel ? (
            <FormLabel>
              <Typography variant="h6">{formLabel}</Typography>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DatePicker {...datePickerProps} {...field} disabled={!!disabled} format="yyyy/MM/dd" />
              </LocalizationProvider>
            </FormLabel>
          ) : (
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DatePicker {...datePickerProps} {...field} disabled={!!disabled} format="yyyy/MM/dd" />
            </LocalizationProvider>
          )}
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
