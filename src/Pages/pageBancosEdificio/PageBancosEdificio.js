import { Cancel, CheckCircle } from '@mui/icons-material';
import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useBancosEdificio } from 'src/hooks/BancosEdificioHooks/useBancosEdificio';
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";

const Columns = [
    { id: "codigo_banco", label: "Código de Banco" },
    { id: "tipocuenta", label: "Tipo de Cuenta" },
    { id: "numerocuenta", label: "Número de Cuenta" },
    { id: "cuentapuc", label: "Cuenta PUC" },
    { id: "descripcion", label: "Descripción" },
    { id: "estado", label: "Estado", render: (value) => (
      value ? (
        <CheckCircle color="primary" />
      ) : (
        <Cancel color="error" />
      )
    )},
  ];





export   function PageBancosEdificio() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, BancosEdificio, getBancosEdificio } = useBancosEdificio();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getBancosEdificio();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de Bancos Edificio");
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
          <title>Bancos Edificio</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Bancos Edificio"
            btnTitle="Registro de Bancos Edificio"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={BancosEdificio} 
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
  