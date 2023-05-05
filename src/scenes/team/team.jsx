import {
  Alert,
  Box,
  Button,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import WebhookOutlinedIcon from "@mui/icons-material/WebhookOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import KanbanSf from "../kanban/KanbanSf";
import {
  BugReportOutlined,
  Groups2Outlined,
  ManageAccountsOutlined,
} from "@mui/icons-material";

const Team = ({ isHeader }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isTable, setisTable] = useState(true);
  const [snackbar, setSnackbar] = useState(null);

  const toggleManageAccess = () => {
    isTable ? setisTable(false) : setisTable(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await userService.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    { field: "userId", headerName: "userId" },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },

    {
      field: "phone",
      headerName: "Phone Number",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "departmentId",
      headerName: "Department Id",
      type: "number",
      headerAlign: "left",
      align: "left",
      editable: true,
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      headerAlign: "center",
      editable: true,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="70%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            backgroundColor={
              role === "ADMIN"
                ? colors.greenAccent[600]
                : role === "Manager"
                ? colors.blueAccent[600]
                : role === "Developer"
                ? colors.redAccent[600]
                : role === "Tester"
                ? colors.yellowAccent[600]
                : colors.grey[600]
            }
            borderRadius="4px"
          >
            {role === "ADMIN" && <AdminPanelSettingsOutlinedIcon />}
            {role === "Manager" && <ManageAccountsOutlined />}
            {role === "Tester" && <BugReportOutlined />}
            {role === "Developer" && <WebhookOutlinedIcon />}
            {role === "TeamLeader" && <Groups2Outlined />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role === "TeamLeader" ? "Leader" : role}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = () => {
    setSnackbar({ children: "User successfully saved", severity: "success" });
  };

  // const processRowUpdate = useCallback(
  //   async (newRow) => {
  //     // Make the HTTP request to save in the backend
  //     // const response = await mutateRow(newRow);
  //     setSnackbar({ children: "User successfully saved", severity: "success" });
  //     // return response;
  //   }
  //   // [mutateRow]
  // );

  return (
    <Box>
      {isHeader ? (
        <Box m="20px">
          <Header title="TEAM" subtitle="Managing the Team Members" />
        </Box>
      ) : (
        <Box m="0 0 15px 20px">
          <Typography
            variant="h4"
            color={colors.greenAccent[300]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            Team
          </Typography>
        </Box>
      )}
      <Button
        variant="outlined"
        color={isTable ? "secondary" : "warning"}
        justifyItems="right"
        onClick={toggleManageAccess}
        sx={{
          m: "0px 5px 0px 20px",
          color: isTable ? colors.greenAccent[300] : colors.redAccent[300],
          fontWeight: "bold",
        }}
        endIcon={isTable ? <SecurityOutlinedIcon /> : null}
      >
        {isTable ? "Manage Access" : "Return"}
      </Button>
      {isTable ? (
        <Box
          height="75vh"
          m="5px 20px 0 20px"
          sx={{
            "& .MuiBox-root": {},
            "& .MuiDataGrid-root": {
              border: "none",
              scrollbarWidth: 0,
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
          }}
        >
          <DataGrid
            sx={{
              alignSelf: "center",
              "& .css-1ny7bi9-MuiButtonBase-root-MuiButton-root": {
                color: `${colors.greenAccent[200]}`,
              },
              ".css-1miuj5f-MuiDataGrid-panelWrapper": {
                backgroundColor: colors.primary[400],
              },
            }}
            checkboxSelection
            disableRowSelectionOnClick
            // isCellEditable={(params) => params.row.age % 2 === 0}
            // processRowUpdate={processRowUpdate}
            cell
            rows={users}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row.userId}
            columns={columns}
          />
          {!!snackbar && (
            <Snackbar
              open
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClose={handleCloseSnackbar}
              autoHideDuration={6000}
            >
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
          )}
        </Box>
      ) : (
        <Box m="5px 5px 0 10px">
          <KanbanSf />
        </Box>
      )}
    </Box>
  );
};

export default Team;
