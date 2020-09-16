import React from 'react'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';

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
            prod: [],
            prodML: []
        }
    }

    componentDidMount() { 
        var url = `http://localhost:3000/products`
        fetch(url, {
          method: 'GET',
        })
        .then(res => res.json())
        .then((productos) => {
            console.log(productos)
          this.setState({prod:productos})
        })
        .catch(error => console.error('Error:', error))

        var url = `https://api.mercadolibre.com/users/67495033/items/search?access_token=APP_USR-2326379537505729-091616-141a2cae9a785e4aea898288735c7033-640321140`
        fetch(url, {
          method: 'GET',
        }) 
        .then(res => res.json())
        console.log(url)
        .then(productos => {
          console.log(productos)
          this.setState({prodML: productos})
        }) 
        .catch(error => console.log('Error:', error))
        }

    render(){
        const { classes } = this.props;
        return (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Descripción</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Api Local</TableCell>
                    {/* <TableCell align="right">Api ML</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.prod && this.state.prod.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell component="th" scope="row">
                        {p.id}
                      </TableCell>
                      <TableCell align="right">{p.title}</TableCell>
                      <TableCell align="right">{p.price}</TableCell>
                      <TableCell align="right">{p.quantity}</TableCell>
                      <TableCell align="right">{p.descriptions}</TableCell>
                      <TableCell align="right">
                        <img src={`http://localhost:3000/images/${p.images}`} style={image}/>
                      </TableCell>
                      <TableCell>Si</TableCell>
                    </TableRow>
                      ))}
                      {this.state.prodML && this.state.prodML.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell component="th" scope="row">
                        {p.id}
                      </TableCell>
                      <TableCell align="right">{p.title}</TableCell>
                      <TableCell align="right">{p.price}</TableCell>
                      <TableCell align="right">{p.available_quantity}</TableCell>
                      <TableCell align="right">-</TableCell>
                      <TableCell align="right">
                        <img src={p.pictures[0].source} style={image}/>
                      </TableCell>
                      <TableCell>No</TableCell>
                    </TableRow>
                      ))}
                  </TableBody>
              </Table>
            </TableContainer>
        )}
}

export default withStyles(styles, { withTheme: true })(SimpleTable);