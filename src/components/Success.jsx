import { useEffect } from 'react'
import { useStateContext } from '../context/StateContext'
import { BsBagCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Success() {
	const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()
	const COMPANY_EMAIL = 'asd@gmail.com'

	useEffect(() => {
		localStorage.clear()
		setCartItems([])
		setTotalPrice(0)
		setTotalQuantities(0)
	}, [])

	return (
		<div className='success-wrapper'>
			<div className='success'>
				<p className='icon'>
					<BsBagCheckFill />
				</p>
				<h2>Thank you for your order!</h2>
				<p className='email-msg'>Check your email inbox for the receipt.</p>
				<p className='description'>
					If you have any questions please email
					<a className='email' href={`mailto:${COMPANY_EMAIL}`}>
						{COMPANY_EMAIL}
					</a>
				</p>
				<Link to={'/'}>
					<button className='btn' width='300px'>
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Success
