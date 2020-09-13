import React, { useState, useEffect} from 'react';
import './App.css';
import Form from './components/formAddProduct';
import NavBar from './components/NavBar';

function App() {
	const [categoriesML, serCategoriesML] = useState([])
	const [input, setInput] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		image: '',
	})
  const [inputSelect, setInputSelect] = useState([])
  
  const handleSelect = (e) => {
	const categories = Array.from(e.target.selectedOptions).map(
		(category) => category.value
	)
	console.log(categories)
	setInputSelect(categories)
  }
  
  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((response) => {
        return response.json()
      })
      .then((cat) => {
        serCategoriesML(cat)
      })
      .catch( err => console.log('error en fetch: '+ err))
  }, [])

	const handleInputChange = function (e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		})
  }
  
  const handleSubmit = function (e) {
    e.preventDefault()
    const product = {
      title: input.name,
      price: input.price,
	  quantity: input.stock,
	  description: input.description,
      categories: inputSelect,
	}

    createProduct(product)
  }

	const createProduct = function (newProduct) {
    console.log(newProduct)
    fetch('http://localhost:3000/products', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(newProduct),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((product) => {
        console.log('el product es: '+ JSON.stringify(product))  
      })

  }
  
  return (
    <div className="App">
      <div className='formStyle'>
			  <h3>Crear producto</h3>
			<hr />
			<form id='myForm' onSubmit={handleSubmit}>
				<div className='inputContainer'>
					<label>Nombre: </label>
					<input
						type='text'
						name='name'
						onChange={handleInputChange}
						value={input.name}
					/>
				</div>
				<div className='inputContainer'>
					<label>Descripcion: </label>
					<textarea
						name='description'
						onChange={handleInputChange}
						value={input.description}
					/>
				</div>
				<div className='inputContainer'>
					<label>Precio: </label>
					<input
						type='number'
						name='price'
						onChange={handleInputChange}
						value={input.price}
						placeholder='$'
					/>
				</div>
				<div className='inputContainer'>
					<label>Stock: </label>
					<input
						type='number'
						name='stock'
						onChange={handleInputChange}
						value={input.stock}
					/>
				</div>
				<label> seleccione una categoria: </label>
				<div>
					<select
						multiple
						className='form-control'
						name='categories'
						onChange={handleSelect}
						value={inputSelect}
						size = {5}
					>
					{
						categoriesML.map(c => 
						<option key={c.idML} value={c.id}>{c.name}</option>
						)	
					}	
					</select>
				</div>
				<div className='buttonContainer'>
          <input
            type='submit'
            value='Crear'
            className='btn btn-primary ml-2'
          />		
				</div>
			</form>
		</div>
	</div>
	)
}


export default App;
