import { Link } from 'react-router-dom'
import { AiOutlineShopping } from 'react-icons/ai'

import Cart from './Cart'

import { useStateContext } from '../context/StateContext'

function Navbar() {
	const { showCart, setShowCart, totalQuantities } = useStateContext()

	return (
		<div className='navbar-container'>
			<p>
				<Link to={`/`}>Jef Store</Link>
			</p>
			<button className='cart-icon' onClick={() => setShowCart(true)}>
				<AiOutlineShopping />

				{totalQuantities > 0 && (
					<span className='cart-item-qty'>{totalQuantities}</span>
				)}
			</button>

			{showCart && <Cart />}
		</div>
	)
}

export default Navbar
