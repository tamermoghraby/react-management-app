import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbar,
} from "@mui/x-data-grid-pro";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from "@mui/x-data-grid-generator";
import {
  AdminPanelSettingsOutlined,
  BugReportOutlined,
  Groups2Outlined,
  ManageAccountsOutlined,
  WebhookOutlined,
} from "@mui/icons-material";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Alert, Snackbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { useEffect } from "react";
import userService from "../../services/userService";
import Header from "../../components/Header";
import KanbanSf from "../kanban/KanbanSf";

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleAddClick = () => {
    const userId = Math.floor(Math.random() * 1000000);
    console.log("Id", userId);

    setRows((oldRows) => [
      { userId, firstName: "", email: "", isNew: true },
      ...oldRows,
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [userId]: { mode: GridRowModes.Edit, fieldToFocus: "firstName" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="secondary"
        startIcon={<AddIcon />}
        onClick={handleAddClick}
      >
        Add record
      </Button>
      <GridToolbar />
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function Team2({ isHeader }) {
  const [rows, setRows] = useState({});
  const [rowModesModel, setRowModesModel] = useState({});

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState(null);
  const [isTable, setisTable] = useState(true);

  const toggleManageAccess = () => {
    isTable ? setisTable(false) : setisTable(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await userService.getUsers();
        setRows(response.data);
      } catch (error) {
        console.log("Error", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    console.log("RowId:", id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    deleteUser(id);
    setRows(rows.filter((row) => row.userId !== id));
  };

  const deleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId).then((response) => {
        console.log("DeleteUserResponse: ", response.data);
        if (response.status === 200) {
          setSnackbar({
            children: "User Successfully Deleted",
            severity: "success",
          });
        } else {
          setSnackbar({
            children: "Couldn't process your request",
            severity: "error",
          });
        }
      });
    } catch (error) {
      console.log("Error:", error);
      setSnackbar({
        children: "Couldn't process your request",
        severity: "error",
      });
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.userId === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.userId !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log("UpdatedRow:", updatedRow);
    console.log("NewRowId:", newRow.userId);
    try {
      userService.getUserById(newRow.userId).then((response) => {
        console.log("GetUserByIdResponse: ", response.data);
        if (response.data === "User Not Found") {
          addUser(updatedRow);
        } else {
          updateUser(newRow.userId, updatedRow);
        }
      });
    } catch (error) {
      console.log("GetUserByIdError:", error);
    }

    setRows(
      rows.map((row) => (row.userId === newRow.userId ? updatedRow : row))
    );
    return updatedRow;
  };

  const addUser = async (newUser) => {
    try {
      await userService.addUser(newUser).then((response) => {
        console.log("AddUserResponse: ", response.data);
        if (response.status === 200) {
          setSnackbar({
            children: "User Successfully Added",
            severity: "success",
          });
        }
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const updateUser = async (userId, user) => {
    try {
      await userService.updateUser(userId, user).then((response) => {
        console.log("UpdateUserResponse: ", response.data);
        if (response.status === 200) {
          setSnackbar({
            children: "User Successfully Updated",
            severity: "success",
          });
        }
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  const columns = [
    { field: "userId", headerName: "userId" },
    {
      field: "firstName",
      headerName: "First Name",
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      type: "number",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 180,
      editable: true,
    },
    {
      field: "departmentId",
      headerName: "Department Id",
      type: "number",
      editable: true,
    },
    {
      field: "role",
      headerName: "Access Level",
      headerAlign: "center",
      editable: true,
      width: 150,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            m="0 auto"
            p="5px"
            width="70%"
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
            {role === "ADMIN" && <AdminPanelSettingsOutlined />}
            {role === "Manager" && <ManageAccountsOutlined />}
            {role === "Tester" && <BugReportOutlined />}
            {role === "Developer" && <WebhookOutlined />}
            {role === "TeamLeader" && <Groups2Outlined />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role === "TeamLeader" ? "Leader" : role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
          sx={{
            m: "5px 20px 0 20px",
            height: 500,

            "& .MuiBox-root": {},
            "& .MuiDataGrid-root": {
              border: "none",
              scrollbarWidth: 0,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              //   color: colors.greenAccent[300],
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
          {!!snackbar && (
            <Snackbar
              open
              anchorOrigin={{ vertical: "center", horizontal: "center" }}
              onClose={handleCloseSnackbar}
              autoHideDuration={2000}
            >
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
          )}
          <DataGridPro
            getRowId={(row) => row.userId}
            rows={rows}
            columns={columns}
            editMode="row"
            checkboxSelection
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            sx={{
              alignSelf: "center",
              "& .css-1ny7bi9-MuiButtonBase-root-MuiButton-root": {
                color: `${colors.greenAccent[200]}`,
              },
              ".css-1miuj5f-MuiDataGrid-panelWrapper": {
                backgroundColor: colors.primary[400],
              },
            }}
          />
        </Box>
      ) : (
        <Box m="5px 5px 0 10px">
          <KanbanSf />
        </Box>
      )}
    </Box>
  );
}
