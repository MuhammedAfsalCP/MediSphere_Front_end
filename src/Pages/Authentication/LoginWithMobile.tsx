import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import EmailIcon from "@mui/icons-material/Email"; // Corrected import
import { useFormik } from "formik";
import * as Yup from "yup";
import doctorImage from "../../assets/doctor-with-his-arms-crossed-white-background-removebg-preview.png";
import { 
  FormContainer, 
  ImageContainer, 
  LoginWrapper, 
  StyledButton, 
  StyledTextField 
} from "../../utils/materialui/Materialui";
import { AxiosInstance } from "../../lib/AxiosInstance";
import { useDispatch } from "react-redux";
import { LoginSuccess } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

// ✅ Updated validation schema
const validationSchema = Yup.object({
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number") // Ensures it's a 10-digit number
    .required("Mobile number is required"),
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits") // Ensures it's a 6-digit OTP
});

const LoginWithMobile: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otphidden, setOtphidden] = useState<boolean>(false);
  const [err, setError] = useState<string | null>(null);

  const MobileVerifyMutation = useMutation({
    mutationFn: async (values: { mobile_number: string}) => {
      const response = await AxiosInstance.post("/loginmobilenumberotpsent/", values);
      return response.data;
    },
    onSuccess: (data) => {
      setOtphidden(true)
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.error || "An unknown error occurred";
      setError(errorMessage);
    },
  });
  const MobileotpsentMutation = useMutation({
    mutationFn: async (values: { mobile_number: string; otp?: string }) => {
      const response = await AxiosInstance.post("/loginemobilenumberverify/", values);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(LoginSuccess(data));
      navigate("/");
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.error || "An unknown error occurred";
      setError(errorMessage);
    },
  });

  const formik = useFormik({
    initialValues: {
      mobile_number: "",
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setError(null);
      if(otphidden==false){
        MobileVerifyMutation.mutate(values);
      }else{
        MobileotpsentMutation.mutate(values)

      }
    },
  });

  return (
    <LoginWrapper>
      <ImageContainer>
        <img src={doctorImage} alt="Doctor" style={{ maxWidth: "80%", height: "auto" }} />
      </ImageContainer>
      <FormContainer>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
        >
          MediSphere
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome back! Please sign in to your account.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <StyledTextField
            label="Enter Mobile Number"
            variant="outlined"
            fullWidth
            name="mobile_number"
            value={formik.values.mobile_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile_number && Boolean(formik.errors.mobile_number)}
            helperText={formik.touched.mobile_number && formik.errors.mobile_number}
          />
          {otphidden && (
            <Grid item xs={12}>
              <TextField
                label="Enter OTP"
                name="otp"
                value={formik.values.otp}
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                required
              />
            </Grid>
          )}
          <StyledButton 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{ color: "white", mt: 2 }}
          >
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
        
        {/* Sign in with Email Button */}
        <StyledButton onClick={()=>navigate('/login')} variant="outlined" color="primary" startIcon={<EmailIcon />}>
          Sign in with Email
        </StyledButton>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <Link to="/forgetpassword" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
              Forgot Password?
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Don't have an account?{" "}
            <Link to="/userregister" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
              Create an account
            </Link>
          </Typography>
        </Box>
      </FormContainer>
    </LoginWrapper>
  );
};

export default LoginWithMobile;
