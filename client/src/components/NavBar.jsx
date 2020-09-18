import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, makeStyles, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const styles = makeStyles({
    title: {
        flexGrow: 1
    }
  })     

export default function NavBar() {
    const classes = styles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
        };
      return (
        <AppBar position="static">
            <Toolbar>
            {/* <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                <MenuIcon/>
                <Menu 
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                > */}
                <div className="d-flex flex-column">
                    <Link to='/addProduct'>
                    <button type="button" className="btn btn-link text-white">Agregar Producto</button>
                    </Link>
                    <Link to='/list'>
                    <button type="button" className="btn btn-link text-white">Lista Productos</button>
                    </Link>
                </div>
                {/* </Menu>
            </IconButton> */}
                <Typography variant="h6" className={classes.title}>
                PedidoTopia
                </Typography>
                <Button color="inherit">Login</Button> 
            </Toolbar>
        </AppBar>
    ) 
}

 