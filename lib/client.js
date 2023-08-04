import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
	projectId: 'bchm8lt5',
	dataset: 'production',
	apiVersion: '2023-07-23',
	useCdn: true,
	token: import.meta.env.PUBLIC_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = source => builder.image(source)
