import { Paper, styled } from '@mui/material';

/** Widget component */
export const Widget = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
}));
