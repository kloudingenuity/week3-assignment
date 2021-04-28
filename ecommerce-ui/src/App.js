import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import airbnbs from './_data/airbnbs'
import Header from './components/layouts/header.js';
import DrawerRight from './components/layouts/drawer';
import RentalList from './components/rental-list';
import AddRental from './components/new-property';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rentalListItems, setRentalListItems] = useState(airbnbs);
  const [cartItems, setCartItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddToCart = (item) => {
    const newCartItems = [...cartItems, {title: item.title, cost: item.payment.cost}];    
    setCartItems(newCartItems);   
    setOpen(true);     
  };

  const handleRemoveFromCart = (item) => {
    const newCartItems = [...cartItems].filter((e) => e !== item);
    setCartItems(newCartItems);    
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };  

  const handleDialogClose = () => {
    setOpenDialog(false);
  }; 

  const handleAddNewProperty = (item) => {
    const newItems = [...rentalListItems, item];
    setRentalListItems(newItems);
  };

  return (    
    <div className={classes.root}>
      <Header drawerWidth={drawerWidth} open={open} handleDrawerOpen={handleDrawerOpen}
      handleDialogOpen={handleDialogOpen} />
      <main className={clsx(classes.content, {[classes.contentShift]: open,})}>
        <div className={classes.drawerHeader} />
        <RentalList data={rentalListItems} handleAddToCart={handleAddToCart} />
      </main>
      <DrawerRight drawerWidth={drawerWidth} cartItems={cartItems}      
        handleRemoveFromCart={handleRemoveFromCart}
        open={open} handleDrawerClose={handleDrawerClose} />
      <AddRental open={openDialog} handleDialogClose={handleDialogClose} handleAddProperty={handleAddNewProperty} />
    </div>
  );
}

export default App;
