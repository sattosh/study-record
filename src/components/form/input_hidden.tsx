import { useFormContext, Controller } from 'react-hook-form';

export type InputHiddenProps = {
  /** formの要素名 */
  name: string;
  /** デフォルト値 */
  defaultValue?: string;
};

/** フォーム用非表示入力欄 */
export const InputHidden = ({ name, defaultValue }: InputHiddenProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => <input type="hidden" {...field} />}
    />
  );
};
