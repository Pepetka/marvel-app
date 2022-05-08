import react from "react"
import { NavLink, useParams } from "react-router-dom"

import "./singleComic.scss"
import useMarvelService from "../../services/MarvelService"
import setContent from "../../utils/setContent"

const SingleComic = (props) => {
	const [comic, setComic] = react.useState(null)
	const { process, setProcess, getComic } = useMarvelService()
	const { comicId } = useParams()

	react.useEffect(onUpdateComic, [props])

	function onUpdateComic() {
		if (!comicId) {
			return
		}

		getComic(comicId).then((res) => {
			setComic(res)
			setProcess("confirmed")
		})
	}

	return <div className='single-comic'>{setContent(process, false, false, View, comic)}</div>
}

const View = ({ data }) => {
	const { title, description, thumbnail, price, pageCount } = data

	return (
		<>
			<img src={thumbnail} alt={title} className='single-comic__img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name'>{title}</h2>
				<p className='single-comic__descr'>{description}</p>
				<p className='single-comic__descr'>{pageCount}</p>
				<p className='single-comic__descr'>Language: en-us</p>
				<div className='single-comic__price'>{price}</div>
			</div>
			<NavLink to='/comics' className='single-comic__back'>
				Back to all
			</NavLink>
		</>
	)
}

export default SingleComic
