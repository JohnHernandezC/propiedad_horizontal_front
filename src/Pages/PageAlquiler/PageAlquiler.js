import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAlquiler } from 'src/hooks/AlquilerHooks/useAlquiler';
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";
import { CheckCircle, Cancel } from '@mui/icons-material';
import dayjs from 'dayjs';

const Columns = [
  { id: "id_usuario", label: "Usuario" },
  { id: "id_propiedad", label: "ID Propiedad" },
  { id: "fecha_separacion", label: "Fecha de Separación", render: (value) => (
    value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : ''
  )},
  { id: "fecha_entrega", label: "Fecha de Entrega", render: (value) => (
    value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : ''
  )},
  { id: "Pago", label: "Pago", render: (value) => (
    value ? (
      <CheckCircle color="primary" />
    ) : (
      <Cancel color="error" />
    )
  )},
  { id: "estado", label: "Estado", render: (value) => (
    value ? (
      <CheckCircle color="primary" />
    ) : (
      <Cancel color="error" />
    )
  )},
];





export   function PageAlquiler() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, Alquiler, getAlquiler } = useAlquiler();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getAlquiler();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de Alquiler");
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
          <title>Alquiler</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Alquiler"
            btnTitle="Registro de Alquiler"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={Alquiler} 
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
  