import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import Departments from "../departments/departments";
import { RequireAuth } from "react-auth-kit";
import Team2 from "../team/team2";

const Dashboard = () => {
  return (
    <RequireAuth loginPath="/signin">
      <Box>
        <Box m="20px">
          <Header title={"DASHBOARD"} subtitle="Welcome to your Dashboard" />
        </Box>
        <div>
          <Team2 isHeader={false} />
        </div>
        <div>
          <Departments />
        </div>
      </Box>
    </RequireAuth>
  );
};

export default Dashboard;
