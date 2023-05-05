import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [hoveredItem, setHoveredItem] = useState(null);
  const { user } = useContext(UserContext);
  const { collapseSidebar } = useProSidebar();

  function handleToggle() {
    collapseSidebar();
    setIsCollapsed(!isCollapsed);
  }

  const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    return (
      <Link style={{ textDecoration: "none", color: "inherit" }} to={to}>
        <MenuItem
          active={selected === title}
          onClick={() => setSelected(title)}
          icon={icon}
        >
          <Typography>{title}</Typography>
        </MenuItem>
      </Link>
    );
  };

  return (
    <Box
      sx={{
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .css-1wvake5": {
          borderRight: "none",
          height: "200vh",
        },
        "& .ps-sidebar-root .css-1wvake5": {},
      }}
    >
      <Sidebar collapsed={isCollapsed} backgroundColor={colors.primary[400]}>
        <Menu
          iconShape="square"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0) {
                return {
                  color: disabled ? "#eee" : "#455A64",
                  color: active ? "#6870fa" : undefined,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#868dfb !important",
                    borderRadius: "8px !important",
                    fontWeight: "bold !important",
                  },
                };
              }
            },
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            className="pro-inner-item"
            onClick={() => handleToggle()}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="https://marketplace.canva.com/EAFYx69xVOI/1/0/1600w/canva-orange-modern-linkedin-profile-picture-k54C2cqH5tg.jpg"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user ? user.userName : "Guest"}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user ? user.role : "ADMIN"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Departments"
              to="/departments"
              icon={<AccountBalanceOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Navbar;
