import React, { useEffect, useState, useCallback } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useUsers } from "../hooks/UsersHooks/useUsers";

import { ModalBasic } from "../components/modal/ModalBasic";
import { Helmet } from "react-helmet-async";
import { HeaderPage } from "./HeaderPage";
import AddEditUsers from "./FormsUsers/AddEditUsers";
import useResponsive from "../hooks/useResponsive";
import { CustomTable } from "src/components/common/Table";
import { Container } from "@mui/material";
const Columns = [
  { id: 'usuario_email', label: 'Email' },
  { id: 'id_edificio', label: 'Edificio' },
  { id: 'id_propiedad', label: 'Propiedad' },
  { id: 'tipo_registro', label: 'Tipo' },
  { id: 'estado', label: 'Estado' },
  { id: 'fecha_registro', label: 'Fecha Registro' },
  
];

export default function RegisterUserAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, Users, getUsers } = useUsers();

  const mdUp = useResponsive("up", "md");
 

  const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
  const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);

  useEffect(() => {
    getUsers();
  }, [refetch]);

  const MemoizedModalBasic = React.memo(ModalBasic);

  const handleAddClientes = useCallback(() => {
    setTitleModal("Nuevo propietario");
    setContentModal(
     <AddEditUsers onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  }, [openCloseModal, onRefetch]);


  const handleEdit = useCallback((data) => {
    setTitleModal("Editar propietario");
    setContentModal(
     <AddEditUsers onClose={openCloseModal} onRefetch={onRefetch} Data={data} />
    );
    openCloseModal();
  }, [openCloseModal, onRefetch]);

  const handleDelete = (id) => {
    // Handle the delete action, you can use id to identify the entry
  };

// Establece clases CSS condicionales según el ancho de la pantalla


  return (
    <>
      <Helmet>
        <title>registro</title>
      </Helmet>

      <Container maxWidth="xl">
      <HeaderPage
          title="Propietarios"
          btnTitle="Registro de propietarios"
          icono="plus square icon"
          btnClick={handleAddClientes}
        />
        {loading ? (
          <CircularProgress />
        ) : (
           <>
           <CustomTable columns={Columns} data={Users} handleEdit={handleEdit} handleDelete={handleDelete} />

           </> 
        )}

        {showModal && (
          <MemoizedModalBasic
            show={showModal}
            onClose={openCloseModal}
            title={titleModal}
            children={contentModal}
          />
        )}
      </Container>
    </>
  );
}
