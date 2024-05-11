import { Button, ButtonProps, CircularProgress } from '@mui/material';

export type LoadingButtonProps = {
  loaderSize?: number;
  loading?: boolean;
} & ButtonProps;

export const LoadingButton = ({ loading, loaderSize = 24, ...buttonProps }: LoadingButtonProps) => {
  return (
    <Button {...buttonProps} disabled={loading}>
      {loading ? <CircularProgress size={loaderSize} /> : buttonProps.children}
    </Button>
  );
};
