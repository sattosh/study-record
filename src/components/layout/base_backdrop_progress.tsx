import { Backdrop, Box, CircularProgress } from '@mui/material';

export type BaseBackDropProgressProps = {
  /** 表示のステート管理 */
  open: boolean;
  /** バックドロップの色 */
  color?: string;
  /** メインコンテンツを固定するかどうか */
  inBox?: boolean;
  /** サークルのサイズ */
  size?: number;
  /** クリックした時の挙動 */
  onClick?: () => void;
};

/** バックドロップとプログレスバーを表示するコンポーネント */
export const BaseBackDropProgress = (props: BaseBackDropProgressProps) => {
  const { open, color = '#fff', onClick, inBox, size } = props;
  return (
    <>
      {inBox && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            background: 'white',
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="primary" size={size} />
        </Box>
      )}
      {!inBox && (
        <Backdrop
          sx={{
            color,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
          onClick={onClick}
        >
          <CircularProgress color="inherit" size={size} />
        </Backdrop>
      )}
    </>
  );
};
