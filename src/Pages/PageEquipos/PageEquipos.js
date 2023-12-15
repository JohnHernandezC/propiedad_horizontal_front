import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useEquipos } from 'src/hooks/EquiposHooks/useEquipos';
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";
import { CheckCircle, Cancel } from '@mui/icons-material';
const Columns = [
  { id: "tipo_equipo", label: "Tipo de Equipo" },
  { id: "codigo_equipo", label: "Código de Equipo" },
  { id: "nom_equipo", label: "Nombre de Equipo" },
  { id: "descripcion", label: "Descripción" },
  { id: "ubicacion_equipo", label: "Ubicación de Equipo" },
  
  { id: "contabilizado", label: "Contabilizado", render: (value) => (
    value ? (
      <CheckCircle color="primary" />
    ) : (
      <Cancel color="error" />
    )
  )},
  { id: "tiene_depreciacion", label: "Tiene Depreciación", render: (value) => (
    value ? (
      <CheckCircle color="primary" />
    ) : (
      <Cancel color="error" />
    )
  )},

  { id: "fecha_compra", label: "Fecha de Compra" },
  { id: "year_depreciacion", label: "Año de Depreciación" },
  { id: "estado", label: "Estado", render: (value) => (
    value ? (
      <CheckCircle color="primary" />
    ) : (
      <Cancel color="error" />
    )
  )},
];

  



export   function PageEquipos() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, Equipos, getEquipos } = useEquipos();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getEquipos();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de Equipos");
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
          <title>Equipos</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Equipos"
            btnTitle="Registro de Equipos"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={Equipos} 
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
  