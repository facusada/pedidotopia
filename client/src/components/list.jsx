import React from 'react'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import token from '../variables'

const image = {
  maxWidth: '50px',
  width: '100%',
}

const styles = theme => ({
    table: {
      minWidth: 650,
    },
  });

 class SimpleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prod: []
        }

        this.delete = this.delete.bind(this);
        this.cargaProductos = this.cargaProductos.bind(this);
    }

    componentDidMount() { 
      this.cargaProductos();
    }

    async delete(id) {
        const respuesta = await fetch(`http://localhost:3000/products/${id}`, {
          method: 'DELETE',
        })
        if(respuesta){
          console.log('la respuesta luego de borrar en la db es: '+respuesta)
          console.log('ya se podria ejecutar el carga productos de nuevo al borrar')
          await alert('Se borro el producto')
          this.cargaProductos();
          console.log('supuestamente se ejecuta')
        } else {
          alert("Error al borrar")
        }
      
        // if(respuesta.error){
        //   alert("Error al Borrar el producto!");
        // } else {
        //   alert("El producto ha sido borrado");
        // }
      // .catch(err => console.log(err)) 
    }

    cargaProductos(){
      // var url = `https://api.mercadolibre.com/sites/MLA/search?seller_id=174509496`
      var url = 'http://localhost:3000/products'
      fetch(url)
      .then(res => {
        return res.json()
      })
      .then((productos) => {
        this.setState({prod:productos})
      })
      .catch(error => console.error('Error:', error))
    }
    
    render(){
        const { classes } = this.props;
        return (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Link</TableCell>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Nombre</TableCell>
                    <TableCell align="center">Precio</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Modificar</TableCell>
                    <TableCell align="center">Borrar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.prod && this.state.prod.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell component="th" scope="row" align="center">
                        <a href={p.linkMeli} target="blank">Ver articulo</a>
                      </TableCell>
                      <TableCell align="center">{p.idML}</TableCell>
                      <TableCell align="center">{p.title}</TableCell>
                      <TableCell align="center">{p.price}</TableCell>
                      <TableCell align="center">{p.quantity}</TableCell>
                      <TableCell align="center">                   
                        <img src={p.images} style={image} alt=""/>
                      </TableCell>

                      
                      <TableCell align="center"> 
                        <Link to={`/product/modificar/${p.id}`}> 
                          <Button variant="contained" size="small" color="primary" >
                            Modificar
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell align="center"> 
                        <Button variant="contained" size="small" color="secondary" onClick={() => this.delete(p.id)} >
                          Borrar
                        </Button>
                      </TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
    }
}

export default withStyles(styles, { withTheme: true })(SimpleTable);