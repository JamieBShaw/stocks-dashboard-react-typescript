import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

import { Link } from 'react-router-dom';

import { useStyles } from './Styles';
import { Button } from '@material-ui/core';

const LeftDrawer: React.FC = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
        {['Stocks', 'Forex'].map((text) => {
          const lowerCaseText = text.toLowerCase();

          return (
            <ListItem key={text}>
              <Button to={`/${lowerCaseText}`} component={Link}>
                {text}
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
