import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function LoginForm({ formik }) {
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Email"
            type={"text"}
          />
        </Stack>
        <br></br>
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Recuperar
        </LoadingButton>
      </form>
    </>
  );
}
