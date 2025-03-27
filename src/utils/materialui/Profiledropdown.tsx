import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

  interface User {
    
        profile_pic?: string;
        first_name?: string; // Corrected from firs_name
        last_name?: string;
        email?: string;
    
  }
interface ProfileDropdownProps {
    user: User | null;
  dpClick: boolean;
  setDpClick: (value: boolean) => void; // To toggle visibility
  handleLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  dpClick,
  setDpClick,
  handleLogout,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    console.log(user)
  // Open the menu when dpClick is true
  React.useEffect(() => {
    if (dpClick && !anchorEl) {
      setAnchorEl(document.getElementById("profile-button")); // Assumes a parent button with this ID
    } else if (!dpClick && anchorEl) {
      setAnchorEl(null);
    }
  }, [dpClick]);

  const handleMouseEnter = () => {
    setDpClick(true); // Keep open on hover
  };

  const handleMouseLeave = () => {
    setDpClick(false); // Close on leave
  };

  const handleClose = () => {
    setDpClick(false);
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={dpClick}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
            
          mt: 8, // Matches top-[67px]
          right: 4, // Matches right-4
          width: 280, // Adjusted for content
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)", // Matches shadow-2xl
          overflow: "visible",
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Profile Section */}
      <MenuItem
        component={Link}
        to="/Profile"
        sx={{
          p: 2,
          display: "flex",
          
          alignItems: "center",
          justifyContent: "center",
          "&:hover": { bgcolor: "grey.200" }, // Matches hover:bg-gray-200
        }}
      >
        <Avatar
          src={`${apiUrl}/${user?.profile_pic}`}
          alt={user?.first_name || "User"}
          sx={{ width: 48, height: 48, mr: 2, borderRadius: "50%" }} // Matches h-12 w-12 rounded-full
        />
        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "200px" }}>
          <Typography variant="body1" noWrap>
            {user?.first_name || "Unknown"}{user?.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.email || "No email"}
          </Typography>
        </Box>
      </MenuItem>

      {/* Divider */}
      <Box sx={{ borderTop: "1px solid #e0e0e0" }} />

      {/* Logout Button */}
      <MenuItem sx={{ p: 0 }}>
        <Button
          variant="text"
          fullWidth
          sx={{
            p: 2,
            textTransform: "none",
            borderRadius: "0 0 8px 8px", // Matches rounded-b-md
            color: "#fff",
            bgcolor:"#d63c09",
            "&:hover": {
              bgcolor: "#b8360b", // Matches hover:bg-red-500
              color: "white", // Matches hover:text-white
            },
          }}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </MenuItem>
    </Menu>
  );
};

export default ProfileDropdown;