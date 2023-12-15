import React, { useState } from 'react';
import { Tree, TreeNode } from "react-organizational-chart";
import PUC_COL_2023 from './PUC_COL_2023.json';
import {
  Autocomplete,
  TextField,
  Grid,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
  Badge,
  CardContent,
  Typography
} from "@mui/material";
import {
  makeStyles
} from "@material-ui/core/styles";

import BusinessIcon from "@mui/icons-material/Business";
import MoreVertIcon from "@mui/icons-material/MoreVert";


// Estilos
const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    display: 'inline-block',
    borderRadius: 16,
  },
  avatar: {
    backgroundColor: '#ECECF4',
  },
}));





const PagePucEdificio = () => {
  // Estados para la selección actual
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedSubaccounts, setSelectedSubaccounts] = useState([]);
  const classes = useStyles();
  // Función para obtener el label
  const getLabel = (option, prop) => {
    const matchingEntry = PUC_COL_2023.find((entry) => entry[prop] === option);
    return matchingEntry ? matchingEntry.Cuenta : '';
  };

  // Obtener clases únicas del archivo JSON
  const classe = [...new Set(PUC_COL_2023.map((entry) => entry.Clase))];

  // Filtrar grupos según la clase seleccionada
  const groups = selectedClass
    ? [...new Set(PUC_COL_2023.filter((entry) => entry.Clase === selectedClass && entry.tipo === 'GRUPO').map((entry) => entry.Codigo))]
    : [];

  // Filtrar cuentas según el grupo seleccionado
  const accounts = selectedGroup
    ? [...new Set(PUC_COL_2023.filter((entry) => entry.Codigo.startsWith(selectedGroup) && entry.tipo === 'CUENTA').map((entry) => entry.Codigo))]
    : [];

  // Filtrar subcuentas según las cuentas seleccionadas
  const subaccounts = selectedAccounts.flatMap((account) =>
    PUC_COL_2023.filter((entry) => entry.Codigo.startsWith(account) && entry.tipo === 'SUBCUENTA').map((entry) => entry.Codigo)
  );

  const renderTree = () => {
    const createCard = (label, variant, onClick) => (
      <Card variant={variant} className={classes.root}>
        <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">{label}</Typography>
          <IconButton size="small" onClick={onClick}>
            <MoreVertIcon />
          </IconButton>
        </CardContent>
      </Card>
    );
  
    return (
      <Tree
        lineWidth={'2px'}
        lineColor={'#bbc'}
        lineBorderRadius={'12px'}
        className={classes.root} // Aplicar la clase al componente Tree
      >
        <TreeNode
          label={createCard(`Clase: ${getLabel(selectedClass, 'Clase')}`, 'outlined')}
          className={classes.root} // Aplicar la clase al componente TreeNode
        >
          {selectedClass && (
            <TreeNode
              label={createCard(`Grupo: ${getLabel(selectedGroup, 'Codigo')}`, 'outlined')}
              className={classes.root} // Aplicar la clase al componente TreeNode
            >
              {selectedAccounts.map((account) => (
                <TreeNode
                  label={createCard(getLabel(account, 'Codigo'), 'outlined')}
                  className={classes.root} // Aplicar la clase al componente TreeNode
                >
                  {selectedSubaccounts
                    .filter((subaccount) => subaccount.startsWith(account))
                    .map((subaccount) => (
                      <TreeNode
                        label={createCard(getLabel(subaccount, 'Codigo'), 'outlined')}
                        className={classes.root} // Aplicar la clase al componente TreeNode
                      />
                    ))}
                </TreeNode>
              ))}
            </TreeNode>
          )}
        </TreeNode>
      </Tree>
    );
  };
  
  return (
    <Grid container spacing={2}>
      {/* Selector de Clase */}
      <Grid item xs={3}>
        <Autocomplete
          options={classe}
          getOptionLabel={(option) => getLabel(option, 'Clase')}
          value={selectedClass}
          onChange={(_, value) => {
            setSelectedClass(value);
            setSelectedGroup(null);
            setSelectedAccounts([]);
            setSelectedSubaccounts([]);
          }}
          renderInput={(params) => <TextField {...params} label="Seleccionar Clase" />}
        />
      </Grid>
  
      {/* Selector de Grupo */}
      {selectedClass && (
        <Grid item xs={3}>
          <Autocomplete
            options={groups}
            getOptionLabel={(option) => getLabel(option, 'Codigo')}
            value={selectedGroup}
            onChange={(_, value) => {
              setSelectedGroup(value);
              setSelectedAccounts([]);
              setSelectedSubaccounts([]);
            }}
            renderInput={(params) => <TextField {...params} label="Seleccionar Grupo" />}
          />
        </Grid>
      )}
  
      {/* Selector de Cuentas */}
      {selectedGroup && (
        <Grid item xs={3}>
          <Autocomplete
            multiple
            options={accounts}
            getOptionLabel={(option) => getLabel(option, 'Codigo')}
            value={selectedAccounts}
            onChange={(_, values) => {
              setSelectedAccounts(values);
              setSelectedSubaccounts([]);
            }}
            renderInput={(params) => <TextField {...params} label="Seleccionar Cuentas" />}
          />
        </Grid>
      )}
  
      {/* Selector de Subcuentas */}
      {selectedAccounts.length > 0 && (
        <Grid item xs={3}>
          <Autocomplete
            multiple
            options={subaccounts}
            getOptionLabel={(option) => getLabel(option, 'Codigo')}
            value={selectedSubaccounts}
            onChange={(_, values) => {
              setSelectedSubaccounts(values);
            }}
            renderInput={(params) => <TextField {...params} label="Seleccionar Subcuentas" />}
          />
        </Grid>
      )}
  
      {/* Representación en forma de árbol */}
      <Grid item xs={12}>
        {renderTree()}
      </Grid>
    </Grid>
  );
          };

export default PagePucEdificio;