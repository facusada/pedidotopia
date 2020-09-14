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
      image: "",
      categoriesML: [],
      imgs: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmitImage = this.handleSubmitImage.bind(this);
  }

  handleChange(e) {
      this.setState({[e.target.name]: e.target.value})
  }

  handleChangeImage = (e) => {
    this.setState({imgs: e.target.files})
  }
  
  handleSubmitImage = (e) => {
    e.preventDefault()
    const formImage = new FormData()
    for (let i = 0; i < this.state.imgs.length; i++) {
			formImage.append('images', this.state.imgs[i])
		}
		fetch(`http://localhost:3000/images`, {
			method: 'POST',
			credentials: 'include',
			body: formImage,
		})
			.then((res) => res.json())
			.then((data) => {
        console.log('se subio la imagen '+ data)
				this.setState({images: data})
				// setnoSubido(false);
				// setCreado(true);
				// setTimeout(()=> {
				// 	setCreado(false);
				// }, 5000)
			})
			.catch( err => { console.log('error imagen '+ err)
				// setCreado(false);
				// setnoSubido(true);
			})
  }

  onSubmit(e) {
    e.preventDefault();
      var url = `http://localhost:3000/products`;
      var data =  {
        title: this.state.title,
        categories: this.state.categories, 
        price: this.state.price,
        quantity: this.state.quantity,
        description: this.state.description,
        images: this.state.images
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
        images: ""
      })
  }

  componentDidMount() {
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
        disabled id="standard-disabled"
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
        <div className="mx-auto w-25 mb-5">
          <label>Subir imagenes</label>
        <hr/>
          <input
            onChange={this.handleChangeImage}
            type='file'
            className='form-control-file'
            name='images'
            multiple
          />
          <div className="d-flex align-items-center">
            <button
              type='button'
              onClick={this.handleSubmitImage}
              className='btn btn-info mt-1'
              >
              Subir imagen
            </button>
          {/* {creado? <div class="alert alert-success  ml-5 mb-0 mt-1 px-3 py-1" role="alert">
                Se subió con exito!
                </div>
              : '' }
          {noSubido? <div class="alert alert-danger  ml-3 mb-0 mt-1 px-3 py-1" role="alert">
                Error! No se pudo subir.
                </div>: '' } */}
          </div>
        </div>

        <label> Seleccione una categoria: </label>
        <div>
          <select
            multiple
            className='form-control w-25 mx-auto'
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
        </div> <br/>

        <Button variant="contained" color="primary" onClick={this.onSubmit} >
          Enviar
        </Button> 

    </React.Fragment>
    )}
}




