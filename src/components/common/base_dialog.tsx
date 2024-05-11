import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import { PropsWithChildren } from 'react';
import { SyncOrAsyncFunction } from '../../models';
import { LoadingButton } from '.';

export type BaseDialogProps = {
  open: boolean;
  title: string;
  positiveLabel?: string;
  negativeLabel?: string;
  loading?: boolean;
  onClickPositive?: SyncOrAsyncFunction<React.MouseEvent, void>;
  positiveButtonType?: 'submit' | 'button';
  onClickNegative?: SyncOrAsyncFunction<React.MouseEvent, void>;
  activeBackDropClose?: boolean;
  onClose: () => void;
} & DialogProps;

export const BaseDialog = ({
  open,
  onClose,
  title,
  positiveLabel = 'ok',
  negativeLabel,
  loading,
  positiveButtonType = 'submit',
  onClickPositive,
  onClickNegative,
  children,
  activeBackDropClose,
  ...dialogProps
}: PropsWithChildren<BaseDialogProps>) => {
  return (
    <Dialog open={open} onClose={activeBackDropClose ? onClose : undefined} {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {negativeLabel && (
          <LoadingButton loading={loading} onClick={onClickNegative} color="primary" variant="outlined" type={positiveButtonType}>
            {negativeLabel}
          </LoadingButton>
        )}
        <LoadingButton loading={loading} onClick={onClickPositive} color="primary" variant="contained">
          {positiveLabel}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export type UseDialogReturn = {
  dialogState: boolean;
  show: () => void;
  hide: () => void;
  Dialog: (props: Omit<BaseDialogProps, 'open' | 'onClose'>) => JSX.Element;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDialog = (): UseDialogReturn => {
  const [dialogState, setDialogState] = React.useState(false);

  const show = () => setDialogState(true);

  const hide = () => setDialogState(false);

  const Dialog = (props: Omit<BaseDialogProps, 'open' | 'onClose'>) => (
    <BaseDialog {...props} open={dialogState} onClose={hide} onClickNegative={props.onClickNegative || hide} />
  );

  return { dialogState, show, hide, Dialog };
};
