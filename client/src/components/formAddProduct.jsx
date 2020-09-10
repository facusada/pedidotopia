import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';


export default class formAddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: "",
            categoria: "",
            precio: "",
            cantidad: "",
            descripcion: "",
            imagenes: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render () { 
    return( 
            <React.Fragment>
              <br/>
              <TextField 
              required                    
              id="outlined-basic" 
              label="Título" 
              variant="outlined" 
              onChange = {this.handleChange}
              /> <br/> <br/>

              <TextField 
              required                    
              id="outlined-basic" 
              label="Categoría" 
              variant="outlined" 
              /> <br/> <br/>

              <TextField
              id="outlined-number"
              label="Precio"
              type="number"
              InputLabelProps={{
              shrink: true,
              }}
              variant="outlined"
              onChange = {this.handleChange}
              /> <br/> <br/>

              <TextField
              id="outlined-number"
              label="Cantidad"
              type="number"
              InputLabelProps={{
              shrink: true,
              }}
              variant="outlined"
              /> <br/> <br/>

              <TextField 
              required
              id="outlined-multiline-static"
              label="Descripción"
              multiline
              rows={4}
              variant="outlined"
              /> <br/> <br/>

              <Button variant="contained" color="primary">
                Enviar
              </Button>

          </React.Fragment>
    )}
}




