import { useState } from 'react'

import { client, urlFor } from '../../../lib/client'
import { Product } from '../../components'

import {
	AiFillStar,
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineStar,
} from 'react-icons/ai'

import { useStateContext } from '../../context/StateContext'

function ProductDetails({ product, products }) {
	const { image, name, details, price } = product

	const [index, setIndex] = useState(0)

	const { decQty, incQty, qty, onAdd, setShowCart, cartItems } =
		useStateContext()

	return (
		<div>
			<div className='product-detail-container'>
				<div>
					<div className='image-container'>
						<img
							src={urlFor(image && image[index])}
							className='product-detail-image'
						/>
					</div>
					<div className='small-images-container'>
						{image?.map((item, i) => (
							<img
								key={i}
								src={urlFor(item)}
								className={
									i === index ? 'small-image selected-image' : 'small-image'
								}
								onMouseEnter={() => setIndex(() => i)}
							/>
						))}
					</div>
				</div>
				<div className='product-detail-desc'>
					<h1>{name}</h1>
					<div className='reviews'>
						<div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4>Details: </h4>
					<p>{details}</p>
					<p className='price'>${price}</p>
					<div className='quantity'>
						<h3>Quantity:</h3>
						<p className='quantity-desc'>
							<span className='minus' onClick={() => decQty()}>
								<AiOutlineMinus />
							</span>
							<span className='num' style={{ userSelect: 'none' }}>
								{qty}
							</span>
							<span className='plus' onClick={() => incQty()}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className='buttons' style={{ userSelect: 'none' }}>
						<button
							type='button'
							className='add-to-cart'
							onClick={() => onAdd(product, qty)}
						>
							Add to cart
						</button>
						<button
							type='button'
							className='buy-now'
							onClick={() => {
								const foundProduct = cartItems.find(
									item => item._id === product._id,
								)

								if (foundProduct) return setShowCart(true)

								onAdd(product, qty)
								setShowCart(true)
							}}
						>
							Buy now
						</button>
					</div>
				</div>
			</div>
			<div className='maylike-products-wrapper'>
				<h2 style={{ userSelect: 'none' }}>You may also like</h2>
				<div className='marquee'>
					<div className='maylike-products-container track'>
						{products.map(item => (
							<Product key={item._id} {...item} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
