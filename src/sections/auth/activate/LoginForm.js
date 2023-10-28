import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { LoadingButton } from '@mui/lab';
// components

// ----------------------------------------------------------------------

export default function LoginForm({formik}) {
  const navigate = useNavigate();





  return (
    <>
    <form onSubmit={formik.handleSubmit}>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" 
      >
        Activate
      </LoadingButton>
      </form>
    </>
  );
}
