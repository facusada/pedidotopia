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
            prod: []
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
                      <TableCell align="right">{p.description}</TableCell>
                      <TableCell align="right">
                        
                        <img src={`http://localhost:3000/images/${p.images}`} style={image}/>
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