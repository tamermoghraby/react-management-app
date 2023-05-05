import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import departmentService from "../../services/departmentService";
import { useEffect } from "react";

const Departments = ({ isHeader }) => {
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
    <Box>
      {isHeader ? (
        <Box m="20px">
          <Header title="DEPARTMENTS" subtitle="List of Departments" />
        </Box>
      ) : (
        <Box m="40px 0 15px 20px">
          <Typography
            variant="h4"
            color={colors.greenAccent[400]}
            fontWeight="bold"
          >
            Departments
          </Typography>
        </Box>
      )}

      <Box
        height="75vh"
        m="10px 20px 0 20px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            alignContent: "center",
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
        <DataGrid
          rows={departments}
          columns={columns}
          getRowId={(row) => row.departmentId}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Departments;
