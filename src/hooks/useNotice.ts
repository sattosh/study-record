import React from 'react';
import { useDispatch } from 'react-redux';
import { notificationActions } from '../redux/modules';

/** useNoticeフックの戻り値 */
export type UseNoticeReturn = {
  /** 引数で指定したテキストのinfo通知を表示します */
  info: (text: string) => void;
  /** 引数で指定したテキストのwarning通知を表示します */
  warning: (text: string) => void;
  /** 引数で指定したエラー内容のerror通知を表示します */
  error: (errorContent: string | Error) => void;
  /** 引数で指定したテキストのsuccess通知を表示します */
  success: (text: string) => void;
};

/** 通知を表示するフック */
export const useNotice = (): UseNoticeReturn => {
  const dispatch = useDispatch();

  const info = React.useCallback(
    (text: string) => {
      dispatch(notificationActions.pushInfo({ message: text }));
    },
    [dispatch]
  );

  const warning = React.useCallback(
    (text: string) => {
      dispatch(notificationActions.pushWarning({ message: text }));
    },
    [dispatch]
  );

  const error = React.useCallback(
    (errorContent: string | Error) => {
      const text = errorContent instanceof Error ? errorContent.message : errorContent;
      if (text) {
        dispatch(notificationActions.pushError({ message: text }));
      }
    },
    [dispatch]
  );

  const success = React.useCallback(
    (text: string) => {
      dispatch(notificationActions.pushSuccess({ message: text }));
    },
    [dispatch]
  );

  return React.useMemo(() => {
    return { info, warning, error, success };
  }, [info, warning, error, success]);
};
