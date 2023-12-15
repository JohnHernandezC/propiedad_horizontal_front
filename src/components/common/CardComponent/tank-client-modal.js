import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
} from "@mui/material";
import { useAsignaciones, useCliente } from "../../hooks";

export function TankClientModal(props) {
  const { data, onClose } = props;

  const {
    tanques,
    getAsignacionesTanques,
    addAsignacionesTanques,
    updateAsignacionesTanques,
    deleteAsignacionesTanques,
  } = useAsignaciones();
  const { getClienteDB, ClienteDB } = useCliente();

  const [nuevaAsignacion, setNuevaAsignacion] = useState({
    id_tanque: data.id_tanque,
    id_cliente: "",
    capacidad_asignada: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getAsignacionesTanques(data.id_tanque);
    getClienteDB();
  }, [data.id_tanque]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevaAsignacion({ ...nuevaAsignacion, [name]: value });
  };

  const handleAgregar = async () => {
    await addAsignacionesTanques(nuevaAsignacion);
    setNuevaAsignacion({
      id_tanque: data.id_tanque,
      id_cliente: "",
      capacidad_asignada: "",
    });
    await getAsignacionesTanques(data.id_tanque);
  };

  const handleEditar = (asignacion) => {
    setEditingId(asignacion.id_asignacion);
    setNuevaAsignacion({ ...asignacion });
  };

  const handleActualizar = (id) => {
    updateAsignacionesTanques(id, nuevaAsignacion);
    setEditingId(null);
    setNuevaAsignacion({
      id_tanque: data.id_tanque,
      id_cliente: "",
      capacidad_asignada: "",
    }); // aquí reseteas los valores
    getAsignacionesTanques(data.id_tanque); // actualiza la lista de asignaciones después de actualizar una existente
  };

  const handleEliminar = async (id) => {
    await deleteAsignacionesTanques(id);
    await getAsignacionesTanques(data.id_tanque);
  };
  const getRazonSocial = (idCliente) => {
    const cliente =
      ClienteDB && ClienteDB.find((c) => c.id_cliente === idCliente);
    return cliente ? cliente.razon_social : "";
  };

  return (
    <>
      <h2>Clientes asociados al tanque</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Capacidad asignada</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tanques &&
            tanques.map((tanque) => (
              <TableRow key={tanque.id_asignacion}>
                <TableCell>{getRazonSocial(tanque.id_cliente)}</TableCell>

                <TableCell>
                  {editingId === tanque.id_asignacion ? (
                    <TextField
                      required
                      type="number"
                      name="capacidad_asignada"
                      value={nuevaAsignacion.capacidad_asignada}
                      onChange={handleChange}
                    />
                  ) : (
                    tanque.capacidad_asignada
                  )}
                </TableCell>
                <TableCell>
                  {editingId === tanque.id_asignacion ? (
                    <>
                      <Button
                        sx={{
                          backgroundColor: "#444444",
                          color: "#FFFFFF",
                          "&:hover": {
                            backgroundColor: "#BEBEBE", // Color gris cuando se hace hover
                          },
                        }}
                        onClick={() => handleActualizar(tanque.id_asignacion)}
                      >
                        Guardar
                      </Button>
                      <br />
                      <Button
                        sx={{
                          backgroundColor: "#D0302B",
                          color: "#FFFFFF",
                          "&:hover": {
                            backgroundColor: "#BEBEBE", // Color gris cuando se hace hover
                          },
                        }}
                        onClick={() =>
                          handleEditar({
                            ...tanque,
                            capacidad_asignada:
                              nuevaAsignacion.capacidad_asignada,
                          })
                        }
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        sx={{
                          backgroundColor: "#D0302B",
                          color: "#FFFFFF",
                          "&:hover": {
                            backgroundColor: "#BEBEBE", // Color gris cuando se hace hover
                          },
                        }}
                        onClick={() => handleEliminar(tanque.id_asignacion)}
                      >
                        Eliminar
                      </Button>
                      <Button
                        sx={{
                          backgroundColor: "#444444",
                          color: "#FFFFFF",
                          "&:hover": {
                            backgroundColor: "#BEBEBE", // Color gris cuando se hace hover
                          },
                        }}
                        onClick={() => handleEditar(tanque)}
                      >
                        Editar
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {editingId === null && (
        <>
          <h3>Agregar nuevo cliente:</h3>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              required
              select
              label="ID Cliente"
              id="id_cliente"
              name="id_cliente"
              value={nuevaAsignacion.id_cliente}
              onChange={handleChange}
            >
              {ClienteDB &&
                tanques &&
                ClienteDB.filter(
                  (cliente) =>
                    !tanques.some(
                      (asignacion) =>
                        asignacion.id_cliente === cliente.id_cliente
                    )
                ).map((cliente) => (
                  <MenuItem key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.razon_social}
                  </MenuItem>
                ))}
            </TextField>

            <TextField
              required
              label="Capacidad asignada"
              id="capacidad_asignada"
              name="capacidad_asignada"
              value={nuevaAsignacion.capacidad_asignada}
              onChange={handleChange}
              style={{ marginLeft: "16px" }}
              type="number"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#D0302B",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#BEBEBE", // Color gris cuando se hace hover
                },
              }}
              onClick={onClose}
              style={{ marginRight: "16px" }}
            >
              Cerrar
            </Button>
            <Button
              sx={{
                backgroundColor: "#7E7E7E",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#BEBEBE", // Color gris cuando se hace hover
                },
              }}
              onClick={handleAgregar}
            >
              Agregar
            </Button>
          </div>
        </>
      )}
    </>
  );
}
