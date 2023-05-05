import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import departmentService from "../../services/departmentService";
import { useEffect } from "react";

const Departments2 = ({ isHeader }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await departmentService.getDepartments();
        setDepartments(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchDepartments();
  }, []);

  const columns = [
    { field: "departmentId", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Department Name", flex: 1 },
    {
      field: "address",
      headerName: "Address",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "managerId",
      headerName: "ManagerID",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "departmentCode",
      headerName: "Department Code",
      flex: 1,
    },
  ];
  return (
    <Grid container>
      <Grid m={"20px"} item xs={12}>
        {isHeader ? (
          <Header title="DEPARTMENTS" subtitle="List of Departments" />
        ) : (
          <Typography
            variant="h4"
            color={colors.greenAccent[400]}
            fontWeight="bold"
          >
            Departments
          </Typography>
        )}
      </Grid>
      <Grid
        marginX={"20px"}
        item
        xs={12}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box height={"75vh"}>
          <DataGrid
            rows={departments}
            columns={columns}
            getRowId={(row) => row.departmentId}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Departments2;
