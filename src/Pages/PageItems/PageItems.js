import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useItems } from 'src/hooks/ItemsHooks/useItems';
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";
import dayjs from 'dayjs';
import { CheckCircle, Cancel } from '@mui/icons-material';
const Columns = [
    { id: "tipo_producto", label: "Tipo de Producto" },
    { id: "cod_producto", label: "Código de Producto" },
    { id: "referencia_fabrica", label: "Referencia de Fábrica" },
    { id: "nom_producto", label: "Nombre de Producto" },
    { id: "descripcion_producto", label: "Descripción del Producto" },
    { id: "unidad_medida", label: "Unidad de Medida" },
    { id: "impuesto", label: "Impuesto" },
    { id: "controlinventario", label: "Control de Inventario" },
    { id: "clasificacion_tributaria", label: "Clasificación Tributaria" },
    { id: "impuesto_retencion", label: "Impuesto de Retención" },
    { id: "nit_proveedor", label: "NIT del Proveedor" },
    { id: "fecha_resgistro", label: "Fecha de Registro", render: (value) => (
      value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '')},
      { id: "estado", label: "Estado", render: (value) => (
        value ? (
          <CheckCircle color="primary" />
        ) : (
          <Cancel color="error" />
        )
      )},
  ];
  




export   function PageItems() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, Items, getItems } = useItems();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
        getItems();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nuevo registro de Items");
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
          <title>Items</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Items"
            btnTitle="Registro de Items"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable 
             columns={Columns} 
             data={Items} 
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
  