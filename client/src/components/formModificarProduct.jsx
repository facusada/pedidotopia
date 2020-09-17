import React from 'react';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';

export default class modificarProducto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cantidad: "",
            precio: "",
            video: "",
            imagenes: "",
            descripcion: "",
            envio: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit() {
        fetch(`https://localhost:3000/products/${id}/modificar`,{
            method: 'PUT',
            body: {
                cantidad: this.state.cantidad,
                precio: this.state.precio,
                video: this.state.video,
                imagenes: this.state.imagenes,
                descripcion: this.state.descripcion,
                envio: this.state.envio
            }
        })
        .then(res => res.json())
        .then((respuesta) => {
        console.log(respuesta)
        alert("El producto ha sido modificado exitosamente")
      }) 
    }

    render() { 
    return (
        <div> 
        <FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Cantidad disponible</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" name='cantidad' onChange={this.handleChange}/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Precio</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" name='precio' onChange={this.handleChange}/>
            </FormControl>    
            <FormControl>
                <InputLabel htmlFor="my-input">Video</InputLabel> 
                <Input id="my-input" aria-describedby="my-helper-text" name='video' onChange={this.handleChange}/>
            </FormControl>  
            <FormControl>
                <InputLabel htmlFor="my-input">Imágenes</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" name='imagenes' onChange={this.handleChange}/>
            </FormControl>  
            <FormControl>
                <InputLabel htmlFor="my-input">Descripción</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" name='descripcion' onChange={this.handleChange}/>
            </FormControl>  
            <FormControl>
                <InputLabel htmlFor="my-input">Envío</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" name='envio' onChange={this.handleChange}/>
            </FormControl>  
        </FormControl>    <br/>  <br/>  
        <Button variant="contained" color="primary" onClick={this.onSubmit} >
          Enviar
        </Button> 
        </div>
    )}
}
