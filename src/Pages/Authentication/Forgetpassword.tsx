import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import EmailIcon from "@mui/icons-material/Email";
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
import { useNavigate } from "react-router-dom";

// ✅ Updated validation schema for Forget Password
const validationSchema = Yup.object({
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number") // Ensures it's a 10-digit number
    .required("Mobile number is required"),
    password2: Yup.string()
    
    .min(8, "Password must be at least 8 characters"),
    ConfirmationPassword: Yup.string()
    
    .oneOf([Yup.ref("password2")], "Passwords must match"),
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits") // Ensures it's a 6-digit OTP
});

const ForgetPassword: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otphidden, setOtphidden] = useState<boolean>(false);
  const [err, setError] = useState<string | null>(null);

  // Mutation to send OTP to the user's mobile number
  const sendOtpMutation = useMutation({
    mutationFn: async (values: { mobile_number: string }) => {
      const response = await AxiosInstance.post("/forgetpasswordotpsent/", values);
      return response.data;
    },
    onSuccess: () => {
      setOtphidden(true); // Show OTP field after OTP is sent
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.error || "Failed to send OTP. Please try again.";
      setError(errorMessage);
    },
  });

  // Mutation to verify OTP and reset password
  const resetPasswordMutation = useMutation({
    mutationFn: async (values: { checkmobile: string; otp: string; password2: string;ConfirmationPassword: string }) => {
      const response = await AxiosInstance.post("/forgetpasswordsave/", values);
      return response.data;
    },
    onSuccess: () => {
      navigate("/login"); // Redirect to login page after successful password reset
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data?.error || "Failed to reset password. Please try again.";
      setError(errorMessage);
    },
  });

  const formik = useFormik({
    initialValues: {
      mobile_number: "",
      password2: "",
      ConfirmationPassword: "",
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        console.log("hi")
      setError(null);
      if (otphidden==false) {
        // Send OTP if it hasn't been sent yet
        console.log("ji")
        sendOtpMutation.mutate({ mobile_number: values.mobile_number });
      } else {
        // Verify OTP and reset password
        resetPasswordMutation.mutate({
          checkmobile: values.mobile_number,
          otp: values.otp,
          password2: values.password2,
          ConfirmationPassword:values.ConfirmationPassword
        });
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
          Forget Password
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Enter your mobile number to reset your password.
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
            <>
              <StyledTextField
                label="Enter New Password"
                variant="outlined"
                fullWidth
                type="password"
                name="password2"
                value={formik.values.password2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password2 && Boolean(formik.errors.password2)}
                helperText={formik.touched.password2 && formik.errors.password2}
              />
              <StyledTextField
                label="Confirm New Password"
                variant="outlined"
                fullWidth
                type="password"
                name="ConfirmationPassword"
                value={formik.values.ConfirmationPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.ConfirmationPassword && Boolean(formik.errors.ConfirmationPassword)}
                helperText={formik.touched.ConfirmationPassword && formik.errors.ConfirmationPassword}
              />
              <StyledTextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
              />
            </>
          )}
          <StyledButton 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{ color: "white", mt: 2 }}
          >{otphidden ? "Reset Password" : "Send OTP"}
          </StyledButton>
        </form>

        {/* Display error message if any */}
        {err && (
          <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: "center" }}>
            {err}
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Remember your password?{" "}
            <a href="/login" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
              Login here
            </a>
          </Typography>
        </Box>
      </FormContainer>
    </LoginWrapper>
  );
};

export default ForgetPassword;