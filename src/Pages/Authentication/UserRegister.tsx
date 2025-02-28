import React, { useState } from "react";
import {
    Box,
    Typography,
    useTheme,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Grid,
    TextField,
    Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material"; // Import SelectChangeEvent
import { useMutation } from '@tanstack/react-query';
import doctorImage from "../../assets/doctor-with-his-arms-crossed-white-background-removebg-preview.png";
import {
    FormContainer,
    ImageContainer,
    LoginWrapper,
    StyledTextField,
} from "../../utils/materialui/Materialui";
import { AxiosInstance } from "../../lib/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { LoginSuccess } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";

// Define types for form data
interface FormData {
    email: string;
    mobile_number: string;
    password: string;
    password2: string;
    profile_pic: File | null;
    medical_report: File | null;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    height: string;
    weight: string;
    blood_group: string;
    otp: string;
}

const RegisterUser: React.FC = () => {
    const theme = useTheme();
    const [otphidden, setOtphidden] = useState<boolean>(false); // Default value as true
    const dispatch =useDispatch()
    const navigate=useNavigate()
    const [formData, setFormData] = useState<FormData>({
        email: "",
        mobile_number: "",
        password: "",
        password2: "",
        profile_pic: null,
        medical_report: null,
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        height: "",
        weight: "",
        blood_group: "",
        otp: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Fixed handleChange function to accept both TextField and Select events
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const file = event.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, [name]: file }));
    };
    
    
    const validateForm = (): boolean => {
        if (!formData.email || !formData.password || !formData.password2 || !formData.mobile_number) {
            setErrorMessage("All required fields must be filled.");
            return false;
        }
        if (formData.password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return false;
        }
        if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
            setErrorMessage("Password must contain at least one uppercase letter and one number.");
            return false;
        }
        if (formData.password !== formData.password2) {
            setErrorMessage("Passwords do not match.");
            return false;
        }
        return true;
    };

    


    const registerMutation = useMutation({
        mutationFn: async (values: Partial<FormData>) => { 
            console.log("🚀 Submitting Form Data:", values);
    
            const formDataToSend = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (value instanceof File) {
                    formDataToSend.append(key, value); // ✅ Ensure File is sent correctly
                } else if (typeof value === "string") {
                    formDataToSend.append(key, value);
                }
            });
    
            return AxiosInstance.post("/registervalidate/", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: (data) => {
            console.log(data);
            setOtphidden(true);
        },
        onError: (err: any) => {
            console.log(err);
            const errorMessage = err?.response?.data?.error || "An unknown error occurred";
            setErrorMessage(errorMessage);
        },
    });
    

    const otpverify = useMutation({
        mutationFn: async (values: Partial<FormData>) => { 
            console.log("🚀 Submitting Form Data:", values);
    
            const formDataToSend = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (value instanceof File) {
                    formDataToSend.append(key, value); // Ensure File fields are correctly appended
                } else if (typeof value === "string") {
                    formDataToSend.append(key, value);
                }
            });
    
            return AxiosInstance.post("/userregistersave/", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: (data) => {
            console.log("✅ Registration Successful:", data);
            dispatch(LoginSuccess(data))
                navigate('/')
        },
        onError: (err: any) => {
            console.error("❌ Registration Error:", err);
            const errorMessage = err?.response?.data?.error || "An unknown error occurred";
            setErrorMessage(errorMessage);
        },
      });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);
        if (validateForm()) {
            if(otphidden==false){
                registerMutation.mutate({ email: formData.email, mobile_number: formData.mobile_number, password: formData.password, password2: formData.password2 });
            }else{
                otpverify.mutate(formData)
            }
        }
    };

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
                    Create your account to get started.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="First Name" name="first_name" fullWidth onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Last Name" name="last_name" fullWidth onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email" name="email" fullWidth onChange={handleChange} required type="email" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Mobile Number" name="mobile_number" fullWidth onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Confirm Password"
                                name="password2"
                                type="password"
                                fullWidth
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField label="Date of Birth" name="date_of_birth" type="date" fullWidth onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Gender</InputLabel>
                                <Select name="gender" value={formData.gender} onChange={handleChange}>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Height (cm)" name="height" type="number" fullWidth onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Weight (kg)" name="weight" type="number" fullWidth onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Blood Group</InputLabel>
                                <Select name="blood_group" value={formData.blood_group} onChange={handleChange}>
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A-">A-</MenuItem>
                                    <MenuItem value="B+">B+</MenuItem>
                                    <MenuItem value="B-">B-</MenuItem>
                                    <MenuItem value="O+">O+</MenuItem>
                                    <MenuItem value="O-">O-</MenuItem>
                                    <MenuItem value="AB+">AB+</MenuItem>
                                    <MenuItem value="AB-">AB-</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField label="Profile Picture" type="file" fullWidth name="profile_pic" onChange={handleFileChange} InputLabelProps={{ shrink: true }} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField label="Medical Report" type="file" fullWidth name="medical_report" onChange={handleFileChange} InputLabelProps={{ shrink: true }} required />
                        </Grid>
                    </Grid>
                    {otphidden&&<Grid item xs={12}>
                        <TextField
                            label="Enter OTP"
                            name="otp"
                            fullWidth
                            onChange={handleChange}
                            required
                        />
                    </Grid>}
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, color: 'white' }}>Sign Up</Button>
                </form>
                {errorMessage && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                already have an account{" "}
            <Link to="/login" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
             Login
            </Link>
          </Typography>
            </FormContainer>
        
        </LoginWrapper>
    );
};

export default RegisterUser;
