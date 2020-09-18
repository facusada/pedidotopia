import React from 'react';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import styles from './formModificar.module.css'
import token from '../variables'
export default class modificarProducto extends React.Component {
    constructor(props) {
        super(props);
        let match = props.match;//← here
        this.state = {
            cantidad: "",
            precio: "",
            titulo: "",
            imagen: "",
            descripcion: "",
            idProduct: match.params.id,
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this)
    }
    componentDidMount(){
        console.log('en form produt modificar: '+token)
        console.log(this.state.idProduct)
        fetch(`http://localhost:3000/products/${this.state.idProduct}`)
        // fetch(`https://api.mercadolibre.com/items?ids=${this.state.idProduct}`)
        .then(res => res.json())
        .then(res => {
            console.log('lo que viene desde la db al buscar por id: '+ JSON.stringify(res))
            // console.log('response es:'+ JSON.stringify(res[0].body))
            // console.log(res[0].body.thumbnail)
            this.setState( {
                cantidad : res.quantity,
                precio : res.price,
                titulo : res.title,
                descripcion : res.description,
                imagen : res.images,
                // envio : res[0].body,
                imgs: []
            } )
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
      }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleChangeImage(e){
      const formImage = new FormData()
      formImage.append('file', e.target.files[0])
		
      fetch( `https://api.mercadolibre.com/pictures/items/upload?access_token=${token}`, {
        method: 'post',
        body: formImage,
      })
      .then((res) => res.json())
      .then((data) => {
        console.log('se subio la imagen '+ JSON.stringify(data.variations[0]))
				this.setState({imagen: data.variations[0].url})
			})
			.catch( err => { console.log('error imagen '+ err)
			})
    }
    
    onSubmit() {
        var data = {
            available_quantity: this.state.cantidad,
            price: this.state.precio,
            title: this.state.titulo,
            descripcion: this.state.descripcion
        }

        fetch(`http://localhost:3000/products/${this.state.idProduct}/modificar`,{
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((respuesta) => {
        console.log('la respuesta del modificare s: '+JSON.stringify(respuesta))
            // alert("El producto ha sido modificado exitosamente")
         }) 
      .catch(err => console.log('modificar sale por el catch '+ err))
      
      if(this.state.imagen !== ""){
          fetch(`http://localhost:3000/products/picture/${this.state.idProduct}/modificar`)
          fetch(`https://api.mercadolibre.com/items/{item_id}?access_token=${token}`,{
              method: 'PUT',
              body: {
                  pictures: { source: this.state.imagen}
              }
          })
          .then(res => res.json())
          .then(res => {
              console.log('se modifico la imagen'+ res)
          })
          .catch(err => console.log(err))
      }
    }

    render() { 
    return (
        <div> 
        <FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Titulo</InputLabel> 
                <Input id="my-input" aria-describedby="my-helper-text" name='titulo' 
                onChange={this.handleChange} value={this.state.titulo}/>
            </FormControl>  
            <FormControl>
                <InputLabel htmlFor="my-input">Cantidad disponible</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" name='cantidad' 
                onChange={this.handleChange} value={this.state.cantidad}/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Precio</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" name='precio' 
                onChange={this.handleChange} value={this.state.precio}/>
            </FormControl>    
            {/* <FormControl>
                <InputLabel htmlFor="my-input">Imágenes</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" name='imagenes' 
                onChange={this.handleChange} value={this.state.imagen}/>
            </FormControl> */}
            <hr/>
            <div className="w-50 mx-auto">
                <p>Imagen: </p>
                <input
                    onChange={this.handleChangeImage}
                    type='file'
                    className='form-control-file'
                    name='images'
                    multiple
                />
            </div>
            <div className={`w-50 mx-auto p-3 mb-3`}>
                <img src={this.state.imagen} alt="imagen produ" className={styles.wrapperImage}/>
            </div>  
            <FormControl>
                <InputLabel htmlFor="my-input">Descripcion</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" name='condicion' 
                onChange={this.handleChange} value={this.state.descripcion}/>
            </FormControl>  
        </FormControl>    <br/>  <br/>  
        <Button variant="contained" color="primary" onClick={this.onSubmit} value={this.state} >
          Enviar
        </Button> 
        </div>
    )}
}
