import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useGestionDocumental } from 'src/hooks/GestionDocumentalHooks/useGestionDocumental';
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";
import { CheckCircle, Cancel } from '@mui/icons-material';
import dayjs from 'dayjs';

const Columns = [
    { id: "tipo_doc", label: "Tipo de Documento" },
  
    { id: "num_doc", label: "Número de Documento" },
    { id: "Descripcion", label: "Descripción" },
    { id: "Observacion", label: "Observación" },
    { id: "fecha_resgistro", label: "Fecha de Registro", render: (value) => (
      value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '') },
    { id: "fecha_documento", label: "Fecha del Documento" , render: (value) => (
      value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '') },
    { id: "archivo", label: "Archivo" },
    { id: "estado", label: "Estado", render: (value) => (
      value ? (
        <CheckCircle color="primary" />
      ) : (
        <Cancel color="error" />
      )
    )},
  ];
  



export   function PageGestionDocumental() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, GestionDocumental, getGestionDocumental } = useGestionDocumental();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getGestionDocumental();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de gestion documental");
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
          <title>GestionDocumental</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Gestion Documental"
            btnTitle="Registro de GestionDocumental"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={GestionDocumental} 
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
  