import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";
import { useVisitantes } from 'src/hooks/VisitantesHooks/useVisitantes';
import { CheckCircle, Cancel } from '@mui/icons-material';
const Columns = [
  { id: "id_propiedad", label: "Propiedad" },
  { id: "hora_entrada", label: "Hora de entrada" },
  { id: "hora_salida", label: "Hora de salida" },
  { id: "fecha_registro", label: "Fecha de registro" },
  { id: "nom_visitante", label: "Nombre del visitante" },
  { id: "id_visitante", label: "Identificacion del visitante" },
  { id: "asunto", label: "Asunto" },
  { id: "observacion", label: "Observación" },
  {
    id: "salida",
    label: "Salida",
    render: (value) => (
      value ? (
        <CheckCircle color="primary" />
      ) : (
        <Cancel color="error" />
      )
    ),
  },
];




export   function PageVisitors() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, Visitantes, getVisitantes } = useVisitantes();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getVisitantes();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de visitantes");
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
          <title>visitantes</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Visitantes"
            btnTitle="Registro de visitantes"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={Visitantes} 
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
  