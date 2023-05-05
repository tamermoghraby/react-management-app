import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

import { kanbanData, kanbanGrid } from "../../data/mockData";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import userService from "../../services/userService";
import UserCard from "../../components/UserCard";
import UserCard2 from "../../components/UserCard2";

const KanbanTest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const hoverRoleColors = {
    Manager: colors.blueAccent[300],
    TeamLeader: colors.greenAccent[300],
    Developer: colors.redAccent[300],
    Tester: colors.grey[300],
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

  return (
    <Box
      sx={{
        ".e-kanban": {
          height: "auto",
          backgroundColor: "transparent",
        },
        ".e-card": {
          backgroundColor: "transparent",
          border: "none",
        },
        ".e-kanban .e-kanban-header .e-header-cells": {
          backgroundColor: colors.blueAccent[700],
          borderRadius: "5px 5px 0px 0px",
          "&:hover": {
            backgroundColor: colors.blueAccent[600],
          },
        },
        ".e-kanban-header .e-header-cells .e-header-wrap .e-header-title": {},
        //   ".e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card":
        //     {
        //       border: `1px solid ${colors.primary[300]}`,
        //       boxShadow: "5",
        //       "&:hover": {
        //         backgroundColor: colors.primary[400],
        //       },
        //     },
        ".e-kanban .e-kanban-table .e-header-cells .e-header-text": {
          color: colors.grey[100],
        },
        ".e-kanban .e-kanban-content .e-content-row .e-content-cells.e-collapsed .e-collapse-header-text":
          {
            color: colors.grey[100],
          },
        //   ".e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-header .e-card-header-title":
        //     {
        //       color: colors.greenAccent[500],
        //     },
        //   ".e-kanban .e-kanban-table.e-content-table .e-card .e-card-content": {
        //     borderRadius: "10px",
        //     color: colors.grey[200],
        //   },
        ".e-kanban .e-kanban-table.e-content-table .e-card.e-selection": {},
        ".e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-content":
          { border: "none" },
        ".e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card":
          {
            border: "none",
          },
        "& .e-kanban .e-kanban-table .e-header-cells .e-item-count": {
          color: colors.grey[200],
        },
        ".card-container": {
          display: "flex",
          p: 1,
          alignItems: "center",
          border: "none",
          cursor: "pointer",
        },
        ".card-container:hover": {
          opacity: 0.6,
        },
        ".e-kanban .e-kanban-content .e-content-row:not(.e-swimlane-row) .e-content-cells":
          {
            backgroundColor: colors.primary[400],
            borderRadius: "0px 0px 5px 5spx",
          },
        ".e-kanban .e-kanban-content .e-content-row:not(.e-swimlane-row) .e-content-cells.e-dropping":
          {},
      }}
    >
      <KanbanComponent
        id="kanban"
        keyField="role"
        dataSource={users}
        cardSettings={{
          headerField: "userId",
          template: (cardData) => <UserCard2 user={cardData} />,
        }}
        swimlaneSettings={{}}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {kanbanGrid.map((item, index) => (
            <ColumnDirective keyField={index} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </Box>
  );
};

export default KanbanTest;
