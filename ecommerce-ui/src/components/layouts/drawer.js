import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCart from '../shopping-cart';

DrawerRight.propTypes = {
  open: PropTypes.bool.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired
  })).isRequired,
  drawerWidth: PropTypes.number.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired
}

let drawerWidth = 0;
const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    }
  }));

export default function DrawerRight(props) {
    drawerWidth = props.drawerWidth;
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={props.open}
            classes={{
              paper: classes.drawerPaper,
            }}>
            <div className={classes.drawerHeader} >
                <IconButton onClick={props.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <ShoppingCart cartItems={props.cartItems} 
                handleRemoveFromCart={props.handleRemoveFromCart}/>
        </Drawer>
    );    
}