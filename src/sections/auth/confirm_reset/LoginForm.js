import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Iconify from "../../../components/iconify";

export default function LoginForm({formik}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="new_password"
            value={formik.values.new_password}
            onChange={formik.handleChange}
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={formik.touched.new_password && Boolean(formik.errors.new_password)}
            helperText={formik.touched.new_password && formik.errors.new_password}
          />
          <TextField
            name="re_new_password"
            value={formik.values.re_new_password}
            onChange={formik.handleChange}
            label="Confirmar contraseña"  
            type={showPassword2 ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword2(!showPassword2)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword2 ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={formik.touched.re_new_password && Boolean(formik.errors.re_new_password)}
            helperText={formik.touched.re_new_password && formik.errors.re_new_password}
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
