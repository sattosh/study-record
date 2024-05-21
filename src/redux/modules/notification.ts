import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** メッセージの種別 */
export enum PushType {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  DEFAULT = 'default',
}

/** メッセージのpayloadの型 */
type PushResult<Type extends PushType> = {
  /** メッセージ表示する文字列 */
  message: string;
  /** メッセージを一意に識別するためのkey */
  key: string;
  /** メッセージの種別. 種別によりメッセージのレイアウトが変更されます */
  type: Type;
};

/** 通常メッセージのprepareの戻り値の型 */
type InfoResult = PushResult<PushType.INFO>;
/** 警告メッセージのprepareの戻り値の型 */
type WarningResult = PushResult<PushType.WARNING>;
/** エラーメッセージのprepareの戻り値の型 */
type ErrorResult = PushResult<PushType.ERROR>;
/** 成功メッセージのprepareの戻り値の型 */
type SuccessResult = PushResult<PushType.SUCCESS>;

/** メッセージ追加Actionのpayloadの型 */
type PushPayload<T> = {
  result: T;
};

/** 通常メッセージのpayload型 */
type InfoPayload = PushPayload<InfoResult>;
/** 警告メッセージのpayload型 */
type WarningPayload = PushPayload<WarningResult>;
/** エラーメッセージのpayload型 */
type ErrorPayload = PushPayload<ErrorResult>;
/** 成功メッセージのpayload型 */
type SuccessPayload = PushPayload<SuccessResult>;

type State = {
  /** 表示待ちと表示中の通常メッセージ */
  infos: Array<InfoResult>;
  /** 表示待ちと表示中の警告メッセージ */
  warnings: Array<WarningResult>;
  /** 表示待ちと表示中のエラーメッセージ */
  errors: Array<ErrorResult>;
  /** 表示待ちと表示中の成功メッセージ */
  successes: Array<SuccessResult>;
};

export type NotificationState = State;

export type NotificationRootState = { notification: State };

/** storeの初期値 */
const initialState: State = {
  infos: [],
  warnings: [],
  errors: [],
  successes: [],
};

/** payloadオブジェクト作成関数 */
const payload = <T extends InfoResult | ErrorResult | WarningResult | SuccessResult>(pl: T): { payload: PushPayload<T> } => ({
  payload: { result: pl },
});

/** メッセージ判定用のkeyを作成します */
const makeMessageKey = (type: PushType): string => {
  return `${type}_${new Date().getTime()}${Math.random()}`;
};

/** 通知メッセージを管理用のstore定義 */
export const notificationSliceOption = {
  name: 'notification',
  initialState,
  reducers: {
    // infoメッセージを追加します
    pushInfo: {
      prepare: (action: Pick<InfoResult, 'message'>): { payload: InfoPayload } =>
        payload({ key: makeMessageKey(PushType.INFO), type: PushType.INFO, ...action }),
      reducer: (reducerState: State, action: PayloadAction<InfoPayload>): void => {
        reducerState.infos.push(action.payload.result);
      },
    },
    // infoメッセージを削除します
    clearInfo: (reducerState: State, action: PayloadAction<string>): void => {
      reducerState.infos = reducerState.infos.filter((e) => e.key !== action.payload);
    },
    // 警告メッセージを追加します
    pushWarning: {
      prepare: (action: Pick<WarningResult, 'message'>): { payload: WarningPayload } =>
        payload({ key: makeMessageKey(PushType.WARNING), type: PushType.WARNING, ...action }),
      reducer: (reducerState: State, action: PayloadAction<WarningPayload>): void => {
        reducerState.warnings.push(action.payload.result);
      },
    },
    // 警告メッセージを削除します
    clearWarning: (reducerState: State, action: PayloadAction<string>): void => {
      reducerState.warnings = reducerState.warnings.filter((e) => e.key !== action.payload);
    },
    // エラーメッセージを追加します
    pushError: {
      prepare: (action: Pick<ErrorResult, 'message'>): { payload: ErrorPayload } =>
        payload({ key: makeMessageKey(PushType.ERROR), type: PushType.ERROR, ...action }),
      reducer: (reducerState: State, action: PayloadAction<ErrorPayload>): void => {
        reducerState.errors.push(action.payload.result);
      },
    },
    // エラーメッセージを削除します
    clearError: (reducerState: State, action: PayloadAction<string>): void => {
      reducerState.errors = reducerState.errors.filter((e) => e.key !== action.payload);
    },

    // 成功メッセージを追加します
    pushSuccess: {
      prepare: (action: Pick<SuccessResult, 'message'>): { payload: SuccessPayload } =>
        payload({ key: makeMessageKey(PushType.SUCCESS), type: PushType.SUCCESS, ...action }),
      reducer: (reducerState: State, action: PayloadAction<SuccessPayload>): void => {
        reducerState.successes.push(action.payload.result);
      },
    },
    // 成功メッセージを削除します
    clearSuccess: (reducerState: State, action: PayloadAction<string>): void => {
      reducerState.successes = reducerState.successes.filter((e) => e.key !== action.payload);
    },
  },
};

export const notificationSlice = createSlice(notificationSliceOption);

export const notificationActions = notificationSlice.actions;

export const { pushInfo, clearInfo, pushWarning, clearWarning, pushError, clearError, pushSuccess, clearSuccess } =
  notificationSlice.actions;

export type NotificationActionsType = typeof notificationSlice.actions;

export default notificationSlice;
