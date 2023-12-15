import React from 'react';

const CustomLabelComponent = ({ nodeData }) => {
  // `nodeData` contiene la información del nodo actual
  return (
    <text
      x={0}
      y={0}
      dy=".35em"
      fontSize={12}
      fontFamily="Arial, Helvetica, sans-serif"
      textAnchor="middle"
      fill="#333" // Color del texto del nodo
    >
      {nodeData.name}
    </text>
  );
};

export default CustomLabelComponent;
