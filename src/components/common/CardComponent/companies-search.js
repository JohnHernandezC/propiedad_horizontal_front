import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CompaniesSearch = ({ onSearchChange }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
  defaultValue=""
  fullWidth 
  placeholder="buscar tanque"
  startAdornment={(
    <InputAdornment position="start">
      <SvgIcon
        color="action"
        fontSize="small"
      >
        <MagnifyingGlassIcon />
      </SvgIcon>
    </InputAdornment>
  )}
  sx={{ maxWidth: 500 }}
  onChange={(event) => onSearchChange(event.target.value)}
/>

  </Card>
);
