import { useEffect, useRef } from 'react'

import { Link } from 'react-router-dom'
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShopping,
} from 'react-icons/ai'

import { TiDeleteOutline } from 'react-icons/ti'

import { toast } from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'

import { urlFor } from '../../lib/client'

function Cart() {
	const cartRef = useRef()

	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQuantity,
		onDelete,
		handleCheckout,
	} = useStateContext()

	useEffect(() => {
		console.log(cartItems)
	}, [cartItems])

	// const handleCheckout = async () => {
	// 	const response = await fetch(
	// 		'http://localhost:3001/create-checkout-session',
	// 		{
	// 			method: 'POST',

	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify(cartItems),
	// 		},
	// 	)

	// 	if (response.statusCode === 500) return

	// 	const session = await response.json()

	// 	toast.loading('Redirecting...')

	// 	window.location = session.url
	// }

	return (
		<div className='cart-wrapper'>
			<div className='cart-container'>
				<button className='cart-heading' onClick={() => setShowCart(false)}>
					<AiOutlineLeft />
					<span className='heading'> Your Cart</span>
					<span className='cart-num-items'>({totalQuantities}) items</span>
				</button>
				{cartItems.length < 1 && (
					<div className='empty-cart'>
						<AiOutlineShopping size={150} />
						<h3>Your shopping cart is empty</h3>
						<Link to='/'>
							<button className='btn' onClick={() => setShowCart(false)}>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className='product-container'>
					{cartItems.map(item => (
						<div key={item._id} className='product'>
							<img
								src={urlFor(item?.image[0])}
								alt=''
								className='cart-product-image'
							/>
							<div className='item-desc'>
								<div className='flex top'>
									<h5>{item.name}</h5>
									<h4>${item.price}</h4>
								</div>
								<div className='flex bottom'>
									<div>
										<p className='quantity-desc'>
											<span
												className='minus'
												onClick={() => toggleCartItemQuantity(item._id, 'dec')}
											>
												<AiOutlineMinus />
											</span>
											<span className='num' style={{ userSelect: 'none' }}>
												{item.quantity}
											</span>
											<span
												className='plus'
												onClick={() => toggleCartItemQuantity(item._id, 'inc')}
											>
												<AiOutlinePlus />
											</span>
										</p>
									</div>
									<button
										className='remove-item'
										onClick={() => onDelete(item._id)}
									>
										<TiDeleteOutline />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
				{cartItems.length > 0 && (
					<div className='cart-bottom'>
						<div className='total'>
							<h3>Subtotal:</h3>
							<h3>${totalPrice}</h3>
						</div>
						<div className='btn-container'>
							<button className='btn' onClick={handleCheckout}>
								Pay with stripe
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart
