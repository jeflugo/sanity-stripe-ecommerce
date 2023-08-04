import { createContext, useContext, useState, useEffect } from 'react'

import { toast } from 'react-hot-toast'

const Context = createContext()

function StateContext({ children }) {
	const [showCart, setShowCart] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)
	const [totalQuantities, setTotalQuantities] = useState(0)
	const [qty, setQty] = useState(1)

	let foundProduct, index

	const onAdd = (product, quantity) => {
		setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
		setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)

		if (cartItems.find(item => item._id === product._id)) {
			setCartItems(
				cartItems.map(cartProduct => {
					if (cartProduct._id === product._id)
						return {
							...cartProduct,
							quantity: cartProduct.quantity + quantity,
						}
				}),
			)
		} else {
			product.quantity = quantity

			setCartItems(() => [...cartItems, { ...product }])
		}

		toast.success(`${qty} ${product.name} added to te cart.`)
	}

	const onDelete = id => {
		foundProduct = cartItems.find(item => item._id === id)

		const newCartItems = cartItems.filter(item => item._id !== id)

		setTotalPrice(
			prevTotalPrice =>
				prevTotalPrice - foundProduct.price * foundProduct.quantity,
		)
		setTotalQuantities(
			prevTotalQuantities => prevTotalQuantities - foundProduct.quantity,
		)
		setCartItems(newCartItems)
	}

	const toggleCartItemQuantity = (id, value) => {
		foundProduct = cartItems.find(item => item._id === id)
		index = cartItems.findIndex(item => item._id === id)

		if (value === 'inc') {
			const newCartItems = cartItems.map((item, i) => {
				if (i !== index) return item

				return {
					...item,
					quantity: foundProduct.quantity + 1,
				}
			})
			setCartItems(newCartItems)
			setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
			setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
		} else if (value == 'dec') {
			if (foundProduct.quantity === 1) return

			const newCartItems = cartItems.map((item, i) => {
				if (i !== index) return item

				return {
					...item,
					quantity: foundProduct.quantity - 1,
				}
			})
			setCartItems(newCartItems)
			setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
			setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
		}
	}

	const incQty = () => setQty(prevQty => prevQty + 1)

	const decQty = () => {
		if (qty === 1) return

		setQty(prevQty => prevQty - 1)
	}

	const handleCheckout = async () => {
		// const serverUrl = 'http://localhost:3000'
		const serverUrl = 'https://stripe-test-server.onrender.com'

		const response = await fetch(`${serverUrl}/create-checkout-session`, {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		})

		if (response.statusCode === 500) return

		const session = await response.json()

		toast.loading('Redirecting...')

		window.location = session.url
	}

	return (
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				onDelete,
				toggleCartItemQuantity,
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
				handleCheckout,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default StateContext

export const useStateContext = () => useContext(Context)
