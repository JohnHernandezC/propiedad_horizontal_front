import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useCuotas } from 'src/hooks/CuotasHooks/useCuotas';
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";
import { CheckCircle, Cancel } from '@mui/icons-material';
import dayjs from 'dayjs';
const Columns = [
    { id: "id_propiedad", label: "Propiedad" },
    { id: "valor_cuota", label: "Valor de Cuota" },
    { id: "tipo_movimiento", label: "Tipo de Movimiento" },
    { id: "descripcion", label: "Descripción" },
    { id: "frecuencia", label: "Frecuencia" },

    { id: "estado", label: "Estado", render: (value) => (
      value ? (
        <CheckCircle color="primary" />
      ) : (
        <Cancel color="error" />
      )
    )},
  ];
  




export   function PageCuotas() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, Cuotas, getCuotas } = useCuotas();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getCuotas();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de Cuotas");
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
          <title>Cuotas</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Cuotas"
            btnTitle="Registro de Cuotas"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={Cuotas} 
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
  