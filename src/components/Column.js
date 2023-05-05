import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { tokens } from "../theme";

const Column = ({ column, tasks }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      rounded="3px"
      bg="column-bg"
      w="400px"
      h="620px"
      flexDirection="column"
    >
      <Box
        align="center"
        h="60px"
        bg="column-header-bg"
        rounded="3px 3px 0 0"
        px="1.5rem"
        mb="1.5rem"
      >
        <Typography color={colors.grey[100]}>{column.title}</Typography>
      </Box>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <Box
            px="1.5rem"
            flex={1}
            flexDirection="column"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <Box
                    mb="1rem"
                    h="72px"
                    bg="card-bg"
                    rounded="3px"
                    p="1.5rem"
                    outline="2px solid"
                    outlineColor={
                      draggableSnapshot.isDragging
                        ? "card-border"
                        : "transparent"
                    }
                    boxShadow={
                      draggableSnapshot.isDragging
                        ? "0 5px 10px rgba(0, 0, 0, 0.6)"
                        : "unset"
                    }
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Typography>{task.content}</Typography>
                  </Box>
                )}
              </Draggable>
            ))}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default Column;
