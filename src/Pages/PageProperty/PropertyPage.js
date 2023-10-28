import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { CustomTable } from "../../components/common/Table";
import { ModalBasic } from "../../components/modal/ModalBasic";
import { usePropiedades } from "../../hooks/PropiedadesHooks/usePropiedades";
import { HeaderPage } from "../HeaderPage";
import AddEditForm from "./components/AddEditForm";

const Columns = [
    { id: 'tipo_propiedad', label: 'Tipo propiedad' },
    { id: 'num_propiedad', label: 'Número de Propiedad' },
    { id: 'torre', label: 'Torre' },
    { id: 'coeficiente', label: 'Coeficiente' },
    { id: 'cant_parqueadero', label: 'Cantidad de Parqueaderos' },
    { id: 'fecha_resgistro', label: 'Fecha de Registro' },
    { id: 'estado', label: 'Estado' },
    { id: 'privado', label: 'Privado' }
  ];


export default function PropertyPage() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, Propiedades, getPropiedades } = usePropiedades();
    
   
   
  
    const openCloseModal = useCallback(() => setShowModal((prev) => !prev), []);
    const onRefetch = useCallback(() => setRefetch((prev) => !prev), []);
  
    useEffect(() => {
      getPropiedades();
    }, [refetch]);
  
    const MemoizedModalBasic = React.memo(ModalBasic);
  
    const handleAddClientes = useCallback(() => {
      setTitleModal("Nueva propiedad");
      setContentModal(
       <AddEditForm onClose={openCloseModal} onRefetch={onRefetch} />
      );
      openCloseModal();
    }, [openCloseModal, onRefetch]);
  
  
    const handleEdit = useCallback((data) => {
      setTitleModal("Editar propiedad");
      setContentModal(
       <AddEditForm onClose={openCloseModal} onRefetch={onRefetch} Data={data} />
      );
      openCloseModal();
    }, [openCloseModal, onRefetch]);
  
    const handleDelete = (id) => {
      // Handle the delete action, you can use id to identify the entry
    };
    console.table(Propiedades)
  // Establece clases CSS condicionales según el ancho de la pantalla
  
  
    return (
      <>
        <Helmet>
          <title>registro</title>
        </Helmet>
  
        <Container maxWidth="xl">
        <HeaderPage
            title="Propietarios"
            btnTitle="Registro de propietarios"
            icono="plus square icon"
            btnClick={handleAddClientes}
          />
          {loading ? (
            <CircularProgress />
          ) : (
             <>
             <CustomTable columns={Columns} data={Propiedades} handleEdit={handleEdit} handleDelete={handleDelete} />
  
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
  