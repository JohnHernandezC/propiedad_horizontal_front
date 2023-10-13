import React, { useState, useContext } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';
import {
  Assignment as AssignmentIcon,
  Phone as PhoneIcon,
  PhoneDisabled as PhoneDisabledIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
  },
  content: {
    zIndex: 1,
  },
}));

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  return (
    <Container className={`${classes.container} ${classes.content}`}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Usuario
              </Typography>
              <TextField
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<AssignmentIcon fontSize="large" />}
                >
                  Copia tu ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Llamar
              </Typography>
              <TextField
                label="ID a llamar"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabledIcon fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  className={classes.margin}
                >
                  Terminar llamada
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PhoneIcon fontSize="large" />}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                  className={classes.margin}
                >
                  Llamar
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;
