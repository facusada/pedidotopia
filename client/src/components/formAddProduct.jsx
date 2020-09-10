import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';


export default class formAddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            categories: "",
            price: "",
            quantity: "",
            description: "",
            imagenes: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(product) {
      // if(!product.title || !product.categories || !product.price || !product.quantity || !product.description) {
      //   return alert("Todos los campos deben estar completos")
      // }
      // else {
        var url = `http://localhost:3001/products`;
        var data =  {
        title: product.title,
        categories: product.categories, 
        price: product.price,
        quantity: product.quantity
        };
        fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(()=>alert("El formulario ha sido enviado exitosamente"))
        .catch(error => console.error('Error:', error))
       
        this.setState ({ 
          title: "",
          categories: "",
          price: "",
          quantity: "",
          description: "",
        })
      }
  //}

    render () { 
    return( 
            <React.Fragment>
              <br/>
              <TextField 
              required                    
              id="outlined-basic" 
              label="Título" 
              variant="outlined" 
              name= "title"
              value={this.state.title} 
              onChange = {this.handleChange}
              /> <br/> <br/>

              <TextField 
              required                    
              id="outlined-basic" 
              label="Categoría" 
              variant="outlined" 
              name= "categories"
              value={this.state.categories} 
              onChange = {this.handleChange}
              /> <br/> <br/>

              <TextField
              id="outlined-number"
              label="Precio"
              type="number"
              InputLabelProps={{
              shrink: true,
              }}
              variant="outlined"
              name= "price"
              value={this.state.price} 
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
              name= "quantity"
              value={this.state.quantity} 
              onChange = {this.handleChange}
              /> <br/> <br/>

              <TextField 
              required
              id="outlined-multiline-static"
              label="Descripción"
              multiline
              rows={4}
              variant="outlined"
              name= "description"
              value={this.state.description} 
              onChange = {this.handleChange}
              /> <br/> <br/>

              <Button variant="contained" color="primary" onClick={this.onSubmit} >
                Enviar
              </Button>

          </React.Fragment>
    )}
}




