import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// @mui
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

export default function LoginForm({ formik }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Email address"
          />

          <TextField
            name="password"
            value={formik.values.password}
          onChange={formik.handleChange}
            label="Password"
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
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover" to="/reset-password">
            Olvidaste la contraseña?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </>
  );
}
