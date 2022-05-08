import { useHttp } from "../hooks/http.hook"

const useMarvelService = () => {
	const { request, process, setProcess } = useHttp()

	const _apiBase = "https://gateway.marvel.com:443/v1/public/"
	// const _apiKey = "apikey=335903c4bb34cf395d2d5406d87e2ea9"
	const _apiKey = "apikey=05d5a6a8bae98d7e8fda1529ea14faa0"

	const getAllCharacters = async (offset = 300, limit = 9) => {
		const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`)
		return res.data.results.map(_transformCharacter)
	}

	const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
		return res.data.results.map(_transformCharacter)
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
		return _transformCharacter(res.data.results[0])
	}

	const getAllComics = async (offset = 300, limit = 8) => {
		const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`)
		return res.data.results.map(_transformComics)
	}

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
		return _transformComics(res.data.results[0])
	}

	const getDescription = (str) => {
		return str || "Description not found."
	}

	const _transformCharacter = (char) => {
		return {
			name: char.name,
			description: getDescription(char.description),
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items,
		}
	}

	const _transformComics = (comic) => {
		return {
			id: comic.id,
			title: comic.title,
			pageCount: comic.pageCount ? comic.pageCount + " pages" : "No information.",
			thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
			price: comic.prices[0].price ? `${comic.prices[0].price}$` : "NOT AVAILABLE",
			description: comic.description ? comic.description : "Description not found.",
		}
	}

	return {
		process,
		setProcess,
		getAllCharacters,
		getCharacter,
		getCharacterByName,
		getAllComics,
		getComic,
	}
}

export default useMarvelService
