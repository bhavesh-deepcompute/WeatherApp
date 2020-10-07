import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";

export default function Weather() {
  return (
    <Grid container className="container">
      <Grid item md={8} className="search">
        <TextField
          label="Search City"
          fullWidth
          size="small"
          variant="outlined"
        />
        <Button size="small" variant="contained" color="primary">
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
