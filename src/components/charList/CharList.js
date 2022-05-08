import react from "react"
import PropTypes from "prop-types"
import { CSSTransition } from "react-transition-group"

import "./charList.scss"
import useMarvelService from "../../services/MarvelService"
import setContent from "../../utils/setContent"

const CharList = (props) => {
	const [chars, setChars] = react.useState([])
	const [end, setEnd] = react.useState(false)

	const { process, setProcess, getAllCharacters } = useMarvelService()

	react.useEffect(onUpdateChars, [])

	function onCharsLoaded(charsArr) {
		setChars((chars) => chars.concat(charsArr))

		if (charsArr.length < 9) {
			setEnd(true)
		}
	}

	function onUpdateChars() {
		const offset = 300 + chars.length

		getAllCharacters(offset).then((res) => {
			onCharsLoaded(res)
			setProcess("confirmed")
		})
	}

	const refsArr = react.useRef([])

	function onFocus(id) {
		refsArr.current.map((item) => item.classList.remove("char__item_selected"))
		refsArr.current[id].classList.add("char__item_selected")
		refsArr.current[id].focus()
	}

	const charsList = chars.map((char, i) => {
		const { name, thumbnail } = char,
			imgStyle = thumbnail.indexOf("image_not_available")
				? "object-fit: contain"
				: "object-fit: cover"

		let liClass = "char__item"

		return (
			<li
				ref={(ref) => (refsArr.current[i] = ref)}
				className={liClass}
				key={char.id}
				onClick={() => {
					props.onSelectChar(char.id)
					onFocus(i)
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						props.onSelectChar(char.id)
						onFocus(i)
					}
				}}
				onFocus={(e) => e.target.classList.add("char__item_focus")}
				onBlur={(e) => e.target.classList.remove("char__item_focus")}
				tabIndex='0'
			>
				<img src={thumbnail} alt={name} style={{ imgStyle }} />
				<div className='char__name'>{name}</div>
			</li>
		)
	})

	const ending = end ? null : (
		<button
			className='button button__main button__long'
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onUpdateChars()
				}
			}}
			onClick={onUpdateChars}
			disabled={process === "loading"}
		>
			<div className='inner'>{process === "loading" ? "loading..." : "load more"}</div>
		</button>
	)

	return (
		<div className='char__list'>
			<CSSTransition in={process === "confirmed"} timeout={1000} classNames='char__animate'>
				<ul className='char__grid'>{charsList}</ul>
			</CSSTransition>
			{setContent(process)}
			{ending}
		</div>
	)
}

CharList.propTypes = {
	onSelectChar: PropTypes.func,
}

export default CharList
