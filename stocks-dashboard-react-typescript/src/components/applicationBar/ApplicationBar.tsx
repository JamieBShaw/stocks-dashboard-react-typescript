import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './Styles';

import { IAppBarProps } from '../../utils/interfaces';

const ApplicationBar: React.FC<IAppBarProps> = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} color="default" position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          World Trading Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
