import React from 'react';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import styles from './formModificar.module.css'
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
            condicion: "",
            idProduct: match.params.id,
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this)
    }
    componentDidMount(){
        console.log(this.state.idProduct)
        fetch(`https://api.mercadolibre.com/items?ids=${this.state.idProduct}`)
        .then(res => res.json())
        .then(res => {
            // console.log('response es:'+ JSON.stringify(res[0].body))
            console.log(res[0].body.thumbnail)
            this.setState( {
                cantidad : res[0].body.available_quantity,
                precio : res[0].body.price,
                titulo : res[0].body.title,
                condicion : res[0].body.attributes[0].value_name,
                imagen : res[0].body.thumbnail,
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
		
      fetch( 'https://api.mercadolibre.com/pictures/items/upload?access_token=APP_USR-2319781659457528-091710-bace5fa0f1615a9a5441e571140f97b7-174509496', {
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
            condition: this.state.condicion
        }

        console.log('el adat que voy a enviar es: '+JSON.stringify(data))
        fetch(`https://api.mercadolibre.com/items/${this.state.idProduct}?access_token=APP_USR-2319781659457528-091710-bace5fa0f1615a9a5441e571140f97b7-174509496`,{
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: data
        })
        .then(res => res.json())
        .then((respuesta) => {
        console.log('la respuesta del modificare s: '+JSON.stringify(respuesta))
            // alert("El producto ha sido modificado exitosamente")
         }) 
      .catch(err => console.log('modificar sale por el catch '+ err))
      
      if(this.state.imagen !== ""){
          fetch(`https://api.mercadolibre.com/items/{item_id}?access_token=APP_USR-2319781659457528-091710-bace5fa0f1615a9a5441e571140f97b7-174509496`,{
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
                <InputLabel htmlFor="my-input">Condicion Producto</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" name='condicion' 
                onChange={this.handleChange} value={this.state.condicion}/>
            </FormControl>  
        </FormControl>    <br/>  <br/>  
        <Button variant="contained" color="primary" onClick={this.onSubmit} value={this.state} >
          Enviar
        </Button> 
        </div>
    )}
}
