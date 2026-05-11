// import.meta.glob laddar alla filer i assets-mappen på en gång vid byggtid
// eager: true betyder att de laddas direkt, inte lazily
const images = import.meta.glob('../assets/*', { eager: true })

// getImage tar ett filnamn (t.ex. "flamingo.avif") och returnerar den importerade bilden
// Om bilden inte hittas returneras en tom sträng
export const getImage = (filename) => {
	const key = `../assets/${filename}`
	return images[key]?.default ?? ''
}