import { useFormContext, Controller } from 'react-hook-form';
import { Box, Divider, MenuItem, Select, SelectProps } from '@mui/material';

import { FormControl, FormHelperText, FormLabel, Typography } from '@mui/material';
import React from 'react';

export type SelectOption = { value: number; label: string };

export type InputSelectProps = {
  name: string;
  disabled?: boolean;
  formLabel?: string;
  options?: SelectOption[];
  customOption?: React.ReactNode;
  defaultValue?: string;
} & SelectProps;

export const InputSelect = ({
  name,
  disabled,
  formLabel,
  options = [],
  customOption: CustomOption,
  defaultValue = '',
  ...selectProps
}: InputSelectProps) => {
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
              <Select type="text" {...field} {...selectProps} disabled={!!disabled}>
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                {CustomOption && (
                  <Box>
                    <Divider />
                    {CustomOption}
                  </Box>
                )}
              </Select>
            </FormLabel>
          ) : (
            <Select {...field} {...selectProps} disabled={!!disabled}>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              {/* {CustomOption && (
                <Box>
                  <Divider />
                  {CustomOption}
                </Box>
              )} */}
            </Select>
          )}
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
