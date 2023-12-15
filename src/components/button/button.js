<Stack direction="row" spacing={1} alignItems="center">

<Button
  variant="contained"
  sx={{
    backgroundColor: "#D0302B",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#BEBEBE",
    },
  }}
  onClick={onDelete}
>
  Eliminar
</Button>
<Button
  variant="contained"
  sx={{
    backgroundColor: "#008CBA",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#BEBEBE",
    },
  }}
  onClick={onAdd}
>
  Agregar
</Button>
</Stack>