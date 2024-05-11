import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NoMatchPage = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h1">Not Found</Typography>
      <Typography variant="body1">Sorry, that page doesn't exist!</Typography>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </Box>
  );
};
