import { Box, Button, styled, TextField } from "@mui/material";

export const LoginWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      padding: theme.spacing(2),
    },
  }));
  
  export const ImageContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    height: "100vh",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      padding: theme.spacing(2),
    },
  }));
  
  export const FormContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
    },
  }));
  
  export const StyledTextField = styled(TextField)({
    marginBottom: "16px",
    width: "100%",
  });
  
  export const StyledButton = styled(Button)({
    marginTop: "16px",
    width: "100%",
    padding: "12px",
    fontWeight: "bold",
  });