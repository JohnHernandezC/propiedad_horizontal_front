import React, { useState, useEffect } from 'react';
import { Typography, Grid } from "@mui/material";

const TreeView = ({ hierarchy }) => {
  const renderNode = (node) => (
    <div key={node.label} style={{ marginLeft: `${node.level * 20}px` }}>
      <Typography variant="body1">
        {node.label}
      </Typography>
      {node.children && node.children.map(renderNode)}
    </div>
  );

  return (
    <div>
      {hierarchy.map(renderNode)}
    </div>
  );
};

const extractCodeFromSubaccount = (subaccount) => {
  // Ajusta esto según la estructura real de tus datos
  return subaccount.Codigo || subaccount;
};

const MultiSubaccountSelector = ({ allSubaccounts, onSelectionChange }) => {
  const [selectedSubaccounts, setSelectedSubaccounts] = useState([]);
  const [hierarchy, setHierarchy] = useState([]);

  useEffect(() => {
    // Construir la jerarquía basada en la estructura de códigos
    const buildHierarchy = () => {
      const hierarchyMap = {};

      selectedSubaccounts.forEach((subaccount) => {
        const code = extractCodeFromSubaccount(subaccount);
        const codeSegments = code.split('');

        let currentLevel = hierarchyMap;
        codeSegments.forEach((segment, index) => {
          if (!currentLevel[segment]) {
            currentLevel[segment] = {
              label: segment,
              level: index,
              children: {},
            };
          }
          currentLevel = currentLevel[segment].children;
        });
      });

      // Convertir la estructura en un array
      const hierarchyArray = Object.values(hierarchyMap);
      setHierarchy(hierarchyArray);
    };

    buildHierarchy();
    onSelectionChange(selectedSubaccounts);
  }, [selectedSubaccounts, onSelectionChange]);

  const handleChange = (_, values) => {
    setSelectedSubaccounts(values);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {/* Resto del código de tu componente */}
      </Grid>
      <Grid item xs={6}>
        <TreeView hierarchy={hierarchy} />
      </Grid>
    </Grid>
  );
};

export default MultiSubaccountSelector;
