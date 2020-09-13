import React, { useEffect } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function SimpleTable()  {

   const classes = useStyles();
   const [productos, setProductos] = React.useState(null);

    useEffect(() => { 
    var url = `http://localhost:3000/products`
    fetch(url, {
      method: 'GET',
    })
    .then(res => res.json())
    .then((productos) => {
      setProductos(productos)
    })
    .catch(error => console.error('Error:', error))
    })
  

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
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {productos.map((p) => (
              <TableRow key={p.name}>
                <TableCell component="th" scope="row">
                  {p.id}
                </TableCell>
                <TableCell align="right">{p.title}</TableCell>
                <TableCell align="right">{p.price}</TableCell>
                <TableCell align="right">{p.quantity}</TableCell>
                <TableCell align="right">{p.description}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    )
}
 
