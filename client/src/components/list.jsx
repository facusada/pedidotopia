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
    }

    componentDidMount() { 
        var url = `https://api.mercadolibre.com/sites/MLA/search?seller_id=174509496`
        fetch(url, {
          method: 'GET',
        })
        .then(res => res.json())
        .then((productos) => {
          this.setState({prod:productos.results})
        })
        .catch(error => console.error('Error:', error))
      }

    delete(id) {
      fetch(`http://localhost:3000/product/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then((respuesta) => {
        console.log(respuesta)
        alert("El producto ha sido borrado exitosamente")
      }) 

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
                    <TableCell align="center">Descripción</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Modificar</TableCell>
                    <TableCell align="center">Borrar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.prod && this.state.prod.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell component="th" scope="row" align="center">
                        <a href={p.permalink} target="blank">Ver articulo</a>
                      </TableCell>
                      <TableCell align="center">{p.id}</TableCell>
                      <TableCell align="center">{p.title}</TableCell>
                      <TableCell align="center">{p.price}</TableCell>
                      <TableCell align="center">{p.available_quantity}</TableCell>
                      <TableCell align="center">{p.description}</TableCell>
                      <TableCell align="center">                   
                        <img src={p.thumbnail} style={image} alt=""/>
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