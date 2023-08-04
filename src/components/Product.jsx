import { Link } from 'react-router-dom'
import { urlFor } from '../../lib/client'

function Product({ image, name, slug, price }) {
	return (
		<div>
			<Link to={`/product/${slug.current}`}>
				<div className='product-card'>
					<img
						src={urlFor(image && image[0])}
						width={250}
						height={250}
						className='product-image'
						alt={name}
					/>
					<p className='product-name'>{name}</p>
					<p className='product-price'>${price}</p>
				</div>
			</Link>
		</div>
	)
}

export default Product