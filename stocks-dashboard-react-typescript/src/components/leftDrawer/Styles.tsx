import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 100;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      position: 'static',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      variant: 'elevation',
      backgroundColor: 'grey',
      zIndex: -2,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      paddingTop: '0px',
      marginTop: '0px',
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);
