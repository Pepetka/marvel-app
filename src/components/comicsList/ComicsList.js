import react from "react"
import { NavLink } from "react-router-dom"
import { CSSTransition } from "react-transition-group"

import "./comicsList.scss"
import useMarvelService from "../../services/MarvelService"
import setContent from "../../utils/setContent"

const ComicsList = () => {
	const [comics, setComics] = react.useState([])
	const [end, setEnd] = react.useState(false)

	const { process, setProcess, getAllComics } = useMarvelService()

	react.useEffect(onUpdateComics, [])

	function onComicsLoaded(comicsArr) {
		setComics((comics) => comics.concat(comicsArr))

		if (comicsArr.length < 8) {
			setEnd(true)
		}
	}

	function onUpdateComics() {
		const offset = 300 + comics.length

		getAllComics(offset).then((res) => {
			onComicsLoaded(res)
			setProcess("confirmed")
		})
	}

	const comicsArr = comics.map((item, i) => {
		const { title, price, thumbnail, id } = item

		return (
			<li
				className='comics__item'
				key={id + i}
				onFocus={(e) => e.target.classList.add("comics__item_focus")}
				onBlur={(e) => e.target.classList.remove("comics__item_focus")}
			>
				<NavLink to={"/comics/" + id}>
					<img src={thumbnail} alt={title} className='comics__item-img' />
					<div className='comics__item-name'>{title}</div>
					<div className='comics__item-price'>{price}</div>
				</NavLink>
			</li>
		)
	})

	const ending = end ? null : (
		<button
			className='button button__main button__long'
			onClick={onUpdateComics}
			disabled={process === "loading"}
		>
			<div className='inner'>{process === "loading" ? "loading..." : "load more"}</div>
		</button>
	)

	return (
		<div className='comics__list'>
			<CSSTransition in={process === "confirmed"} timeout={1000} classNames='comics__animate'>
				<ul className='comics__grid'>{comicsArr}</ul>
			</CSSTransition>
			{setContent(process)}
			{ending}
		</div>
	)
}

export default ComicsList
