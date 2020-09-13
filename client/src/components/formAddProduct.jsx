import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';


export default class formAddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            categories: [],
            price: "",
            quantity: "",
            description: "",
            imagenes: [],
            categoriesML: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
      e.preventDefault(); 
      // if(!title || !categories || !product.price || !product.quantity || !product.description) {
      //   return alert("Todos los campos deben estar completos")
      // }
      // else {
        var url = `http://localhost:3000/products`;
        var data =  {
        title: this.state.title,
        categories: this.state.categories, 
        price: this.state.price,
        quantity: this.state.quantity,
        description: this.state.description
        };
        fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then((product)=> {
          alert("El formulario ha sido enviado exitosamente")
        console.log(product) })
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

  componentDidMount() {
    //e.preventDefault();
    var url = `http://localhost:3000/categories`
    fetch(url, {
      method: 'GET',
    })
    .then(res => res.json())
    .then((categorias) => {
      this.setState({categoriesML: categorias})
    })
    .catch(error => console.error('Error:', error))
  }

   handleSelect = (e) => {
    const categories = Array.from(e.target.selectedOptions).map(
      (category) => category.value
    )
      this.setState({categories: categories})
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

           <label> seleccione una categoria: </label>
            <div>
              <select
                multiple
                className='form-control'
                name='categories'
                onChange={this.handleSelect}
                value={this.state.categories}
                size = {5}
              >
              
              { 
               this.state.categoriesML.map(c => 
                <option key={c.id} value={c.id}>{c.name}</option>
                )	
              }	
              </select>
            </div>

              <Button variant="contained" color="primary" onClick={this.onSubmit} >
                Enviar
              </Button>

              {/* <Button variant="contained" color="primary" onClick={this.categorias} >
                TRAER CATEGORIAS
              </Button> */}

          </React.Fragment>
    )}
}




