import { Box, Button, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { DoctorCardStyled} from "../../../../utils/materialui/Materialui";
const profileurl = import.meta.env.VITE_API_URL;
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
            src={`${profileurl}/media/${doctor.profile_pic}`}
            alt="Doctor Avatar"
            style={{ width: "50px", height: "50px", borderRadius: "50%" ,objectFit: "cover", }}
          />
        </Box>
        <Typography variant="h6">{doctor.first_name} {doctor.last_name}</Typography>
        <Typography color="textSecondary">
          Specialization: {doctor.department}
        </Typography>
        <Typography color="textSecondary">
          Experience: {doctor.years_of_experiance} years
        </Typography>
        <Typography color="textSecondary">Fees: ₹{doctor.consultation_fee}</Typography>
        <Button variant="contained" sx={{ mt: 2, color: "white" }}>
          Book Now
        </Button>
      </CardContent>
    </DoctorCardStyled>
  );
};
export default DoctorCard;