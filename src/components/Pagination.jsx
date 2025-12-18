import React from 'react';
import PaginationMui from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const sizes = { small: 'small', medium: 'medium' };

const Pagination = ({ page, totalPages, onChange, size = sizes.medium, disabled = false }) => {
  if (totalPages <= 1) return null;
  return (
    <Stack alignItems='center'>
      {' '}
      <PaginationMui
        page={page}
        count={totalPages}
        onChange={(_, value) => onChange(value)}
        size={size}
        disabled={disabled}
        color='primary'
        showFirstButton
        showLastButton
      />{' '}
    </Stack>
  );
};
export default Pagination;
