export type SyncOrAsyncFunction<T, R = void> = (arg: T) => R | Promise<R>;

/** 何かの辞書型 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyDictionary = Record<string, any>;
