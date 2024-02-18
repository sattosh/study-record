import { Backdrop, CircularProgress } from '@mui/material';

export type BaseBackDropProgressProps = {
  /** 表示のステート管理 */
  open: boolean;
  /** バックドロップの色 */
  color?: string;
  /** クリックした時の挙動 */
  onClick?: () => void;
};

/** バックドロップとプログレスバーを表示するコンポーネント */
export const BaseBackDropProgress = (props: BaseBackDropProgressProps) => {
  const { open, color = '#fff', onClick } = props;
  return (
    <Backdrop sx={{ color, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClick}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
