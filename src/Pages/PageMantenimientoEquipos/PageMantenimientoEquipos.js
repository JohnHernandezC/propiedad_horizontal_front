import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMantenimientoEquipos } from 'src/hooks/MantenimientoEquiposHooks/useMantenimientoEquipos';
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";
import { CheckCircle, Cancel } from '@mui/icons-material';
import dayjs from 'dayjs';
const Columns = [
    { id: "id_equipo", label: "Equipo" },
    { id: "fecha_registro", label: "Fecha de Registro", render: (value) => (
      value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '') },
    { id: "fecha_inicial", label: "Fecha Inicial", render: (value) => (
      value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '') },
    { id: "fecha_final", label: "Fecha Final", render: (value) => (
      value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '') },
    { id: "descripcion_mtto", label: "Descripción de Mantenimiento" },
    { id: "estado", label: "Estado", render: (value) => (
      value ? (
        <CheckCircle color="primary" />
      ) : (
        <Cancel color="error" />
      )
    )},
  ];
  




export   function PageMantenimientoEquipos() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, MantenimientoEquipos, getMantenimientoEquipos } = useMantenimientoEquipos();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getMantenimientoEquipos();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de mantenimiento equipos");
      setContentModal(
       <AddEditForm onClose={openCloseModal} onRefetch={onRefetch} />
      );
      openCloseModal();
    }, [openCloseModal, onRefetch]);
  
  
    const handleEdit = useCallback((data) => {
      setTitleModal("Editar registro");
      setContentModal(
       <AddEditForm onClose={openCloseModal} onRefetch={onRefetch} Data={data} />
      );
      openCloseModal();
    }, [openCloseModal, onRefetch]);
  
    const handleMarcarSalida = (id) => {
      // Handle the delete action, you can use id to identify the entry
    };
    
  
    return (
      <>
        <Helmet>
          <title>Mantenimiento Equipos</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Mantenimiento Equipos"
            btnTitle="Registro de Mantenimiento Equipos"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={MantenimientoEquipos} 
             handleEdit={handleEdit} 
              />
  
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
  