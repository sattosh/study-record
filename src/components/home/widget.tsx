import { styled, Paper } from '@mui/material';

export const Widget = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
}));
