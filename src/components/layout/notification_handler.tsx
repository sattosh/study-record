import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { OptionsObject, SnackbarProvider, closeSnackbar, useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { clearError, clearInfo, clearSuccess, clearWarning } from '../../redux/modules';

const Handler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { notification } = useSelector((state: RootState) => ({
    notification: state.notification,
  }));

  const dispatch = useDispatch();

  // 表示中のメッセージキーを保持する
  const ref = React.useRef<string[]>([]);

  React.useEffect(() => {
    const { infos, warnings, errors, successes } = notification;

    // 表示中のものをのぞいてsnackbarのqueueに追加する
    [...infos, ...warnings, ...errors, ...successes]
      .filter((e) => !ref.current.includes(e.key))
      .forEach((props): void => {
        const { key, message, type } = props;

        const option: OptionsObject<'default' | 'error' | 'info' | 'success' | 'warning'> = {
          key,
          variant: type,
          autoHideDuration: 7000,
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top',
          },
          onExited: () => {
            dispatch(clearInfo(key));
            dispatch(clearWarning(key));
            dispatch(clearError(key));
            dispatch(clearSuccess(key));
            ref.current = ref.current.filter((e) => e !== key);
          },
          action: (
            <IconButton onClick={(): void => closeSnackbar(key)} size="large">
              <Close />
            </IconButton>
          ),
        };

        ref.current.push(key);
        enqueueSnackbar(message, option);
      });
  }, [notification, enqueueSnackbar, dispatch]);

  return null;
};

export const NotificationHandler = () => {
  return (
    <SnackbarProvider maxSnack={5}>
      <Handler />
    </SnackbarProvider>
  );
};
