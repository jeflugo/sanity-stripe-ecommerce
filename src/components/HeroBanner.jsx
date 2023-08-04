import { Link } from 'react-router-dom'
import { urlFor } from '../../lib/client'

function HeroBanner({
	heroBanner: {
		smallText,
		midText,
		largeText1,
		image,
		product,
		buttonText,
		desc,
	},
}) {
	return (
		<div className='hero-banner-container'>
			<div>
				<p className='beats-solo'>{smallText}</p>
				<h3>{midText}</h3>
				<h1>{largeText1}</h1>
				<img
					src={urlFor(image)}
					alt='headphones'
					className='hero-banner-image'
				/>

				<div>
					<Link to={`/product/${product}`}>
						<button type='button'>{buttonText}</button>
					</Link>
				</div>

				<div className='desc'>
					<h5>Description</h5>
					<p>{desc}</p>
				</div>
			</div>
		</div>
	)
}

export default HeroBanner
