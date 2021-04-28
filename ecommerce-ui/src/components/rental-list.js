import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import RentalCard from './rental-card';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:100,
    marginRight:100
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

RentalList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      houseType: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      location: PropTypes.shape({
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired
      }).isRequired,
      payment: PropTypes.shape({
        cost: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired
      }).isRequired,
      host: PropTypes.shape({
        name: PropTypes.string.isRequired,
        isSuperhost: PropTypes.bool.isRequired
      }).isRequired,
      rating: PropTypes.shape({
        stars: PropTypes.number.isRequired,
        reviews: PropTypes.number.isRequired
      }).isRequired,
    })).isRequired,
    handleAddToCart: PropTypes.func.isRequired
}

export default function RentalList(props) {
  const classes = useStyles();

  const handleAddToCartClick = (e) => {    
    props.handleAddToCart(e);
  };

  const rentalList = props.data.map((item, index) => {
    return (
    <Fragment key={index.toString()}>
        <Grid item>
            <RentalCard card={item} handleAddToCartClick={handleAddToCartClick} />
        </Grid>    
        <Divider light />
    </Fragment>);
    });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {rentalList}
      </Grid>
    </div>
  );
}