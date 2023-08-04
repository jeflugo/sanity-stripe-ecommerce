import { Link } from 'react-router-dom'
import { urlFor } from '../../lib/client'

function FooterBanner({
	footerBanner: {
		discount,
		largeText1,
		largeText2,
		saleTime,
		smallText,
		midText,
		product,
		buttonText,
		desc,
		image,
	},
}) {
	return (
		<div className='footer-banner-container'>
			<div className='banner-desc'>
				<div className='left'>
					<p>{discount}</p>
					<h3>{largeText1}</h3>
					<h3>{largeText2}</h3>
					<p>{saleTime}</p>
				</div>
				<div className='right'>
					<p>{smallText}</p>
					<h3>{midText}</h3>
					<p>{desc}</p>
					<Link to={`/product/${product}`}>
						<button>{buttonText}</button>
					</Link>

					<img
						src={urlFor(image)}
						alt='Footer banner image'
						className='footer-banner-image'
					/>
				</div>
			</div>
		</div>
	)
}

export default FooterBanner
