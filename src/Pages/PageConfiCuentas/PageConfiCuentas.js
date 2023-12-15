import { Cancel, CheckCircle } from '@mui/icons-material';
import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useConfiCuentas } from 'src/hooks/ConfiCuentasHooks/useConfiCuentas';
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";

const Columns = [
    { id: "tipo_movimiento", label: "Tipo de Movimiento" },
    { id: "dia_aplicacion", label: "Día de Aplicación" },
    { id: "cuenta_debe", label: "Cuenta Debe" },
    { id: "cuenta_haber", label: "Cuenta Haber" },
    { id: "iva_aplicable", label: "IVA Aplicable" },
    {
      id: "estado",
      label: "Estado",
      render: (value) => (value ? <CheckCircle color="primary" /> : <Cancel color="error" />),
    },
  ];





export   function PageConfiCuentas() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, ConfiCuentas, getConfiCuentas } = useConfiCuentas();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getConfiCuentas();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de ConfiCuentas");
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
          <title>ConfiCuentas</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="ConfiCuentas"
            btnTitle="Registro de ConfiCuentas"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={ConfiCuentas} 
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
  