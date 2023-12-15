import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Card, CardContent } from '@mui/material';

export function ModalBasic(props) {
  const { show, title, children, onClose } = props;

  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ paddingTop: '24px', paddingBottom: '24px' }}>
        <Card>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
