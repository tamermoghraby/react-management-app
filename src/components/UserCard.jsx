import { useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../theme";
import { hover } from "@testing-library/user-event/dist/hover";

const UserCard = ({ user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const roleColors = {
    Manager: colors.blueAccent[800],
    TeamLeader: colors.greenAccent[800],
    Developer: colors.redAccent[800],
    Tester: colors.grey[800],
  };

  const hoverRoleColors = {
    Manager: colors.blueAccent[300],
    TeamLeader: colors.greenAccent[300],
    Developer: colors.redAccent[300],
    Tester: colors.grey[300],
  };

  return (
    <div
      className="user-card"
      style={{
        backgroundColor: roleColors[user.role],
      }}
    >
      <div
        className="card-container"
        style={{ hover: { backgroundColor: colors.blueAccent[700] } }}
      >
        <img
          class=""
          style={{
            marginRight: 10,
            width: "60px",
            height: "60px",
          }}
          src="https://www.shareicon.net/data/64x64/2016/05/24/770136_man_512x512.png"
          alt="Woman's Face"
        />
        <div style={{ margin: 20 }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "17px",
              color: colors.grey[200],
            }}
          >
            {user.firstName}
          </p>
          <p
            class="text-slate-500 font-medium"
            style={{ color: colors.greenAccent[400] }}
          >
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
