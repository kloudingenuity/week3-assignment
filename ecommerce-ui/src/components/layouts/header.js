import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddBoxIcon from '@material-ui/icons/AddBox';

import CssBaseline from '@material-ui/core/CssBaseline';

let drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  }
}));

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  handleDialogOpen: PropTypes.func.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired
}

export default function Header(props) {
  drawerWidth = props.drawerWidth;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" 
        className={clsx(classes.appBar, {
            [classes.appBarShift]: props.open,
        })}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Vacation Rentals
          </Typography>
            <IconButton
              onClick={props.handleDialogOpen}
              color="inherit"
              aria-label="add new rental property">
              <AddBoxIcon/>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open shopping cart"
              edge="end"
              onClick={props.handleDrawerOpen}
              className={clsx(props.open && classes.hide)}>
              <ShoppingCartIcon/>
            </IconButton>
        </Toolbar>
      </AppBar>      
    </div>
  );
}