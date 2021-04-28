import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField } from '@material-ui/core';

AddRental.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func,
  handleAddProperty: PropTypes.func
}

export default function AddRental(props) {
  const initialState = {
    name: "",
    title: "",
    image: "",
    cost: 0,
    city: "",
    country: ""
  };

  const [{ name, title, image, cost, city, country }, setState] = useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = () => {
    if(name === "" || title === "" || image === "" || cost === 0 || city === "" || country === "")
    {
      alert("Input all the required fields");
      return;
    }

    const item = {
      "title": title,
      "houseType": "Entire House",
      "image": image,
      "location": {
          "city": city,
          "country": country
      },
      "payment": {
          "cost": cost,
          "description": ""
      },
      "host": {
          "name": name,
          "isSuperhost": false
      },
      "rating": {
          "stars": 0,
          "reviews": 0
      }
    };
    props.handleAddProperty(item);
    props.handleDialogClose();
    clearState();
  };

  return (
    <Fragment>
      <Dialog open={props.open} onClose={props.handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">BECOME A HOST</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hosting can help you turn your extra space into extra income and pursue more of what you love..
          </DialogContentText>
          <TextField required autoFocus
            margin="dense"
            id="name"
            label="Host Name"
            variant="filled"
            fullWidth
            onChange={handleChange}
          />
          <TextField required margin="dense"
            id="title"
            label="Title"
            variant="filled"
            fullWidth            
            onChange={handleChange}
          />
          <TextField required margin="dense"
          id="image"
          label="Image URL"
          variant="filled"
          fullWidth
          onChange={handleChange}
          />
          <TextField required margin="dense"
            id="cost"
            label="Cost"
            variant="filled"
            fullWidth
            onChange={handleChange}
          />
          <TextField required margin="dense"
            id="city"
            label="City"
            variant="filled"
            fullWidth
            onChange={handleChange}
          />
          <TextField required margin="dense"
          id="country"
          label="Country"
          variant="filled"
          fullWidth
          onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}