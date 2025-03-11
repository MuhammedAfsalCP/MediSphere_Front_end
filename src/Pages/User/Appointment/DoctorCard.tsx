import { Box, Button, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { fadeIn } from "../../../utils/materialui/Materialui";

// Styled component for the doctor card
const DoctorCardStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  animation: `${fadeIn} 1s ease-in-out`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  width: "300px",
  textAlign: "center",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // ✅ Fix: Fallback shadow
  },
}));

const DoctorCard: React.FC<{ doctor: any }> = ({ doctor }) => {
  return (
    <DoctorCardStyled>
      <CardContent>
        {/* Center the image */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <img
            src="https://via.placeholder.com/50"
            alt="Doctor Avatar"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        </Box>
        <Typography variant="h6">{doctor.name}</Typography>
        <Typography color="textSecondary">
          Specialization: {doctor.specialization}
        </Typography>
        <Typography color="textSecondary">
          Experience: {doctor.experience} years
        </Typography>
        <Typography color="textSecondary">Fees: ₹{doctor.fees}</Typography>
        <Button variant="contained" sx={{ mt: 2,  color:"white"}}>
          Book Now
        </Button>
      </CardContent>
    </DoctorCardStyled>
  );
};

export default DoctorCard;
