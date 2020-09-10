import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = makeStyles({
    title: {
        flexGrow: 1
    }
  })     

export default function NavBar() {
    const classes = styles();
    return (
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
                <Typography variant="h6" className={classes.title}>
                Agregar Producto
                </Typography>
                <Button color="inherit">Login</Button> 
            </Toolbar>
        </AppBar>
    ) 
}



