import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation } from '@tanstack/react-query';
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { useFormik } from "formik";
import * as Yup from "yup";
import doctorImage from "../../assets/doctor-with-his-arms-crossed-white-background-removebg-preview.png";
import { FormContainer, ImageContainer, LoginWrapper, StyledButton, StyledTextField } from "../../utils/materialui/Materialui";
import { AxiosInstance } from "../../lib/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { LoginSuccess } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [err, setError] = useState<string | null>(null); // Moved inside the component

  const LoginMutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const response = await AxiosInstance.post('/loginemailandpassword/', values);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);

      dispatch(LoginSuccess(data))
      navigate('/')
    },
    onError: (err: any) => {
      console.log(err)
      const errorMessage = err?.response.data.error || "An unknown error occurred";
      setError(errorMessage);
    },
  });



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setError(null); // Clear previous error on new submission
      LoginMutation.mutate(values);
    },
  });

  return (
    <LoginWrapper>
      <ImageContainer>
        <img src={doctorImage} alt="Doctor" style={{ maxWidth: "80%", height: "auto" }} />
      </ImageContainer>
      <FormContainer>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
          MediSphere
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome back! Please sign in to your account.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <StyledTextField
            label="Enter Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <StyledTextField
            label="Enter Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <StyledButton type="submit" variant="contained" color="primary" sx={{ color: "white", mt: 2 }}>
            Sign In
          </StyledButton>
        </form>

        {/* Display error message if login fails */}
        {err && (
          <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: "center" }}>
            {err}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          OR
        </Typography>
        <StyledButton onClick={()=>navigate('/loginmobile')} variant="outlined" color="primary" startIcon={<SmartphoneIcon />}>
          Sign in with Mobile
        </StyledButton>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <Link to="/forgetpassword" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
              Forgot Password?
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Don't have an account?{" "}
            <Link
              to="/userregister"
              style={{ textDecoration: "none", color: theme.palette.primary.main }}
            >
              Create an account
            </Link>
          </Typography>
        </Box>
      </FormContainer>
    </LoginWrapper>
  );
};

export default Login;
