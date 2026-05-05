const images = import.meta.glob('../assets/*', { eager: true })

export const getImage = (filename) => {
	const key = `../assets/${filename}`
	
	return images[key]?.default ?? ''
}