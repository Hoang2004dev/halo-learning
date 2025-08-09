import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center"
    >
      <Typography variant="h1" fontWeight="bold" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Không tìm thấy trang bạn yêu cầu.
      </Typography>
      <Typography variant="body1" mb={3}>
        Có thể đường dẫn sai hoặc trang đã bị xoá.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Quay về trang chủ
      </Button>
    </Box>
  );
}
