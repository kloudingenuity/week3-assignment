import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, Grid, Divider, IconButton, Tooltip, Chip } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Rating from '@material-ui/lab/Rating';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex"
    },
    h2: {
      margin: "inherit"
    },
    details: {
      display: "flex",
      flexDirection: "column",
      width:"100%"
    },
    content: {
      flex: "1 0 auto",
      height: "150px"
    },
    cover: {
      width: 800
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    playIcon: {
      height: 38,
      width: 38
    }
  }));

  RentalCard.propTypes = {
    card: PropTypes.shape({
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
      }).isRequired,
      handleAddToCartClick: PropTypes.func.isRequired
  }

  export default function RentalCard(props) {
    const classes = useStyles();

    const location = props.card.location.city + " | " + props.card.location.country;

    const paymentDescription = props.card.payment.description ? 
              <Chip size="small"
                label={props.card.payment.description}
                color="primary"/>
              : "";
          
    const isSuperHost = props.card.host.isSuperhost ? 
              <Tooltip title="Super Host">
                <LoyaltyIcon />
              </Tooltip>
              : "";

    return (
        <Card className={classes.root}>          
            <CardMedia
            className={classes.cover}
            image={props.card.image}
            title={props.card.title}/>
            <div className={classes.details}>
                <CardHeader className={classes.heading}
                    avatar=""
                    action={<Tooltip title="Add to cart">
                      <IconButton
                        color="inherit"
                        aria-label="add to cart"                      
                        onClick={() => props.handleAddToCartClick(props.card)}>
                        <AddShoppingCartIcon/>
                      </IconButton>
                    </Tooltip>}
                    title={props.card.title}
                    subheader={location} />
                <CardContent className={classes.content}>
                  <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={4}>
                          <h2 className={classes.h2}>${props.card.payment.cost}</h2>
                      </Grid> 
                      <Grid item xs={4}>
                          <span>{props.card.host.name}</span>
                      </Grid>    
                      <Grid item xs={4}>
                        <Rating name="half-rating-read" defaultValue={props.card.rating.stars} precision={0.5} readOnly />                         
                      </Grid>  
                      <Divider light />  
                    </Grid>
                    <Grid container item xs={12} spacing={3}>                                         
                      <Grid item xs={4}>
                        {paymentDescription}                        
                      </Grid>                                      
                      <Grid item xs={4}>
                        {isSuperHost}                        
                      </Grid>                                     
                      <Grid item xs={4}>
                        <span>Reviews: {props.card.rating.reviews}</span>                        
                      </Grid>   
                      <Divider light />  
                    </Grid>
                  </Grid>
                </CardContent>  
            </div>
        </Card>
    );
}
  