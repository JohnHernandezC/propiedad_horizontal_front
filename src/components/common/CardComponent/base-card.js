import React from 'react';
import Button from '@mui/material/Button';
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CardHeader from "@mui/material/CardHeader";
import { useState } from "react";

export const BaseCard = (props) => {
  const { datos, Delete, Edit, columns } = props;

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <CardHeader
          sx={{
            backgroundColor: "rgba(224, 224, 224, 0.7)",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            color: "#ffffff",
            "& .MuiCardHeader-title": {
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiCardHeader-action": {
              "& svg": {
                color: "inherit",
              },
            },
          }}
          avatar={<Avatar src={""} aria-label="recipe" />}
          action={<></>}
          title={<>titulo</>}
        />

        <CardContent>
          <Stack direction="column" spacing={2}>
            {columns?.map((column) => (
              <Typography key={column.id} variant="body2" color="textSecondary">
                <strong>{column.label}: </strong>
                {column.render ? (
                  column.render(datos[column.id])
                ) : typeof datos[column.id] === "boolean" ? (
                  datos[column.id] ? (
                    <CheckIcon />
                  ) : (
                    <CloseIcon />
                  )
                ) : (
                  datos[column.id]
                )}
              </Typography>
            ))}
          </Stack>
        </CardContent>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Button
              sx={{
                backgroundColor: "#880606", // Dark red
                color: "#fcfcfc", // White
                "&:hover": {
                  backgroundColor: "#d53d0c", // Lighter red on hover
                },
              }}
              onClick={() => Edit(datos)}
            >
              Actualizar
            </Button>
            <Button
              sx={{
                backgroundColor: "#d53d0c", // Lighter red
                color: "#fcfcfc", // White
                "&:hover": {
                  backgroundColor: "#ff8207", // Orange on hover
                },
              }}
              onClick={() => Delete(datos)}
            >
              Eliminar
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};
