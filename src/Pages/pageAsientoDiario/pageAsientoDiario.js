import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAsientoDiario } from 'src/hooks/AsientoDiarioHooks/useAsientoDiario';
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";
import { CheckCircle, Cancel } from '@mui/icons-material';

const Columns = [
    { id: "id_edificio", label: "Edificio" },
    { id: "consecutivo", label: "Consecutivo" },
    { id: "tipoasiento", label: "Tipo de Asiento" },
    { id: "fecha_comprobante", label: "Fecha del Comprobante" },
    { id: "cuenta_contable", label: "Cuenta Contable" },
    { id: "tercero", label: "Tercero" },
    { id: "num_documento", label: "Número de Documento" },
    { id: "debito", label: "Débito" },
    { id: "credito", label: "Crédito" },
    { id: "observacion", label: "Observación" },
    { id: "soporte", label: "Soporte" },
    { id: "estado", label: "Estado", render: (value) => (
      value ? (
        <CheckCircle color="primary" />
      ) : (
        <Cancel color="error" />
      )
    )},
  ];
  





export   function PageAsientoDiario() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, AsientoDiario, getAsientoDiario } = useAsientoDiario();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getAsientoDiario();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de Asiento Diario");
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
  
   
    
  
    return (
      <>
        <Helmet>
          <title>Asiento Diario</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Asiento Diario"
            btnTitle="Registro de AsientoDiario"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={AsientoDiario} 
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
  