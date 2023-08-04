import { useEffect, useState } from 'react'

import { FooterBanner, HeroBanner, Product } from './components'

import { client } from '../lib/client'

function App() {
	const [products, setProducts] = useState()
	const [banner, setBanner] = useState()

	useEffect(() => {
		const productsQuery = '*[_type=="product"]'

		client.fetch(productsQuery).then(data => {
			setProducts(data)
		})
	}, [])

	useEffect(() => {
		const bannerQuery = '*[_type=="banner"]'

		client.fetch(bannerQuery).then(data => {
			setBanner(data)
		})
	}, [])

	return (
		<>
			{banner && <HeroBanner heroBanner={banner[0]} />}
			<div className='products-heading'>
				<h2>Best selling products</h2>
				<p>Speakers of many variations</p>
			</div>
			<div className='products-container'>
				{products &&
					products.map(product => <Product key={product._id} {...product} />)}
			</div>
			{banner && <FooterBanner footerBanner={banner[0]} />}
		</>
	)
}

export default App
