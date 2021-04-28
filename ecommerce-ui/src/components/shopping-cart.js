import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

ShoppingCart.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired
    })).isRequired,
    handleRemoveFromCart: PropTypes.func.isRequired
  }

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
        maxWidth: 375,
        backgroundColor: theme.palette.background.paper,
      },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));
  
export default function ShoppingCart(props) {
    const classes = useStyles();
    let cost = 0;
    const items = props.cartItems.map((item, index) => {     
        cost += item.cost;
        return (        
            <ListItem key={index.toString()} className={classes.root}>           
                <ListItemText edge="start"
                    primary={item.title}             
                />
                <ListItemText edge="end" 
                    primary={`$${item.cost}`}               
                />
                <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => props.handleRemoveFromCart(item)}>
                    <DeleteIcon />
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            );       
        });
    
    const total = cost > 0 ?
        <Fragment>
            <Divider variant="middle" />
            <ListItem className={classes.root}>           
                <ListItemText edge="start"
                    primary="Total"             
                />
                <ListItemText edge="end" 
                    primary={`$${cost}`}              
                />
            </ListItem>
        </Fragment>
        : "";

    return (
        <List dense={false}> 
            {items}             
            {total}
      </List>
    );
}