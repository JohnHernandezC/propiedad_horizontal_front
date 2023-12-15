import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useImpuestos } from 'src/hooks/ImpuestosHooks/useImpuestos';
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";

const Columns = [
    { id: "pais", label: "País" },
    { id: "tipo_impuesto", label: "Tipo de Impuesto" },
    { id: "cuenta_venta", label: "Cuenta de Venta" },
    { id: "cuenta_compra", label: "Cuenta de Compra" },
    { id: "cuenta_dev_compra", label: "Cuenta de Devolución de Compra" },
    { id: "cuenta_dev_venta", label: "Cuenta de Devolución de Venta" },
    { id: "valor_impuesto", label: "Valor de Impuesto" },
    { id: "fecha_resgistro", label: "Fecha de Registro" },
    { id: "estado", label: "Estado" }
  ];
  




export   function PageImpuestos() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, Impuestos, getImpuestos } = useImpuestos();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getImpuestos();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de Impuestos");
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
          <title>Impuestos</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Impuestos"
            btnTitle="Registro de Impuestos"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={Impuestos} 
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
  