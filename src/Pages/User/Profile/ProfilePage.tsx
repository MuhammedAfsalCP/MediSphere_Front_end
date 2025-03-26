import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Divider,
  TextField,
  Input,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import medical from "../../../assets/Frame 215.png";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance, TokenInstance } from "../../../lib/AxiosInstance";

// Dummy data for user
const dummyUser = {
  first_name: "John",
  last_name: "Doe",
  dateofbirth: 19,
  gender: "Male",
  blood_group: "A+",
  address: "123 Main Street, Springfield, IL 62701, USA",
  email: "test@gmail.com",
  phone: "9876543210",
  avatar: "https://via.placeholder.com/150.png?text=User",
  medical_report: medical,
};
const apiUrl = import.meta.env.VITE_API_URL;
const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(dummyUser.avatar);
  const [medicalPreview, setMedicalPreview] = useState<string | null>(dummyUser.medical_report);
  const {data:user, isLoading,error} = useQuery({
    queryKey:["patientdetail"],
    queryFn: async()=>{
      const response = await TokenInstance.get(`/patientdetails/`)
     

      return response.data.User
    },
    // enabled:!!filte\r
    
  })
  console.log(user)
  // Formik setup
  const formik = useFormik({
    initialValues: user,
    onSubmit: (values) => {
      setIsEditing(false);
      console.log("Profile saved:", values);
      // Add API call or other logic to persist changes here
    },
  });
console.log(formik?.values?.first_name)
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
    },
  };

  const reportCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.5 },
    },
  };

  const buttonVariants = {
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    formik.handleSubmit();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        formik.setFieldValue("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMedicalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedicalPreview(reader.result as string);
        formik.setFieldValue("medical_report", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #f0f8ff, #ffffff)",
        py: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle, rgba(70, 130, 180, 0.1) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          background: "rgba(70, 130, 180, 0.05)",
          borderRadius: "50%",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Back Button */}
        <motion.div initial="hidden" animate="visible" variants={itemVariants}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 4,
              textTransform: "none",
              color: "#fff",
              background: "linear-gradient(45deg, #4682b4, #87ceeb)",
              borderRadius: "20px",
              px: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                background: "linear-gradient(45deg, #3a6f9a, #72b8d4)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Main Content: Profile and Medical Report Side by Side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {/* Profile Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ flex: 1 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              {/* Edit and Save Buttons */}
              <Box sx={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 1 }}>
                {!isEditing ? (
                  <motion.div variants={buttonVariants} whileTap="tap">
                    <Button
                      onClick={handleEditClick}
                      sx={{
                        minWidth: 0,
                        p: 1,
                        borderRadius: "50%",
                        background: "linear-gradient(45deg, #4682b4, #87ceeb)",
                        color: "#fff",
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div variants={buttonVariants} whileTap="tap">
                    <Button
                      onClick={handleSaveClick}
                      sx={{
                        minWidth: 0,
                        p: 1,
                        borderRadius: "50%",
                        background: "linear-gradient(45deg, #4682b4, #87ceeb)",
                        color: "#fff",
                      }}
                    >
                      <SaveIcon />
                    </Button>
                  </motion.div>
                )}
              </Box>

              {/* Avatar */}
              <motion.div variants={avatarVariants}>
                <Avatar
                  src={`${apiUrl}/${ formik?.values?.profile_pic}`}
                  alt={`${formik?.values?.first_name} ${formik?.values?.last_name}`}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "4px solid #87ceeb",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    mb: 2,
                  }}
                />
                {isEditing && (
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Input
                      type="file"
                      inputProps={{ accept: "image/*" }}
                      onChange={handleImageChange}
                      sx={{ display: "none" }}
                      id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        size="small"
                        sx={{ textTransform: "none" }}
                      >
                        Change Picture
                      </Button>
                    </label>
                  </Box>
                )}
              </motion.div>

              {/* Name */}
              <Typography
                variant="h4"
                sx={{
                  color: "#4682b4",
                  fontWeight: 700,
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                {isEditing ? (
                  <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                    <TextField
                      name="first_name"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      size="small"
                      variant="outlined"
                    />
                    <TextField
                      name="last_name"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                ) : (
                  `${formik?.values?.first_name} ${formik?.values?.last_name}`
                )}
              </Typography>

              {/* Personal Details and Contact Info in Two Columns */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  width: "100%",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                {/* Personal Details (Left Side) */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    color: "#333",
                    border: "1px solid rgba(70, 130, 180, 0.3)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#4682b4", textAlign: "center", fontSize: "1rem" }}
                  >
                    Personal Details
                  </Typography>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#555" }}>
                        Date of Birth:
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="age"
                          value={formik.values.dateofbirth}
                          onChange={formik.handleChange}
                          size="small"
                          variant="outlined"
                          type="number"
                          sx={{ width: "100px" }}
                        />
                      ) : (
                        <Typography variant="body2">{formik?.values?.date_of_birth}</Typography>
                      )}
                    </Box>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#555" }}>
                        Gender:
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="gender"
                          value={formik?.values.gender}
                          onChange={formik.handleChange}
                          size="small"
                          variant="outlined"
                          sx={{ width: "100px" }}
                        />
                      ) : (
                        <Typography variant="body2">{formik?.values?.gender}</Typography>
                      )}
                    </Box>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#555" }}>
                        Blood Group:
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="blood_group"
                          value={formik?.values.blood_group}
                          onChange={formik.handleChange}
                          size="small"
                          variant="outlined"
                          sx={{ width: "100px" }}
                        />
                      ) : (
                        <Typography variant="body2">{formik?.values?.blood_group}</Typography>
                      )}
                    </Box>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#555" }}>
                        Height:
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="blood_group"
                          value={formik?.values.blood_group}
                          onChange={formik.handleChange}
                          size="small"
                          variant="outlined"
                          sx={{ width: "100px" }}
                        />
                      ) : (
                        <Typography variant="body2">{formik?.values?.blood_group}</Typography>
                      )}
                    </Box>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#555" }}>
                        Weight:
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="blood_group"
                          value={formik?.values.blood_group}
                          onChange={formik.handleChange}
                          size="small"
                          variant="outlined"
                          sx={{ width: "100px" }}
                        />
                      ) : (
                        <Typography variant="body2">{formik?.values?.blood_group}</Typography>
                      )}
                    </Box>
                  </motion.div>
                </Box>

                {/* Contact Info (Right Side) */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    color: "#333",
                    border: "1px solid rgba(70, 130, 180, 0.3)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#4682b4", textAlign: "center", fontSize: "1rem" }}
                  >
                    Contact Info
                  </Typography>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#555" }}>
                        Email:
                      </Typography>
                      <Typography variant="body2">{formik?.values?.email}</Typography>
                    </Box>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#555" }}>
                        Phone:
                      </Typography>
                      <Typography variant="body2">{formik?.values?.phone}</Typography>
                    </Box>
                  </motion.div>
                  
                </Box>
              </Box>
            </Paper>
          </motion.div>

          {/* Medical Report Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ flex: 1 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: "#4682b4",
                  fontWeight: 600,
                  textAlign: "center",
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                Medical Report
              </Typography>
              <Divider sx={{ mb: 3, bgcolor: "rgba(0, 0, 0, 0.1)" }} />

              <motion.div
                variants={reportCardVariants}
                style={{ perspective: 1000, flex: 1, display: "flex", flexDirection: "column" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    p: 2,
                    border: "1px dashed #ddd",
                    maxWidth: "300px",
                    mx: "auto",
                    flex: 1,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <motion.img
                    src={medicalPreview || formik.values.medical_report}
                    alt="Medical Report"
                    style={{
                      objectFit: "fill",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      maxWidth: "100%",
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </Box>
                {isEditing && (
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Input
                      type="file"
                      inputProps={{ accept: "image/*" }}
                      onChange={handleMedicalImageChange}
                      sx={{ display: "none" }}
                      id="medical-report-upload"
                    />
                    <label htmlFor="medical-report-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        size="small"
                        sx={{ textTransform: "none" }}
                      >
                        Change Medical Report
                      </Button>
                    </label>
                  </Box>
                )}
              </motion.div>
            </Paper>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;