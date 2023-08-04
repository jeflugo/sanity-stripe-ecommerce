import { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { client } from '../../lib/client'
import ProductDetails from './product/ProductDetails'
import Success from './Success'

function Layout({ children }) {
	const [products, setProducts] = useState()

	useEffect(() => {
		const productsQuery = '*[_type=="product"]'

		client.fetch(productsQuery).then(data => {
			setProducts(data)
		})
	}, [])
	return (
		<Router>
			{/* <Toaster /> */}
			<div className='layout'>
				<header>
					<Navbar />
				</header>

				<main className='main-container'>
					<Routes>
						<Route path='/' element={children} />
						<Route path='/success' element={<Success />} />
						{products &&
							products.map(product => (
								<Route
									key={product._id}
									path={`/product/${product.slug.current}`}
									element={
										<ProductDetails product={product} products={products} />
									}
								/>
							))}
					</Routes>
				</main>

				<footer>
					<Footer />
				</footer>
			</div>
		</Router>
	)
}

export default Layout
