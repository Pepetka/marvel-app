import react from "react"
import { CSSTransition } from "react-transition-group"

import "./randomChar.scss"
import mjolnir from "../../resources/img/mjolnir.png"
import useMarvelService from "../../services/MarvelService"
import setContent from "../../utils/setContent"

const RandomChar = () => {
	const [char, setChar] = react.useState({})
	const { process, setProcess, getCharacter } = useMarvelService()

	react.useEffect(() => {
		onUpdateChar()
	}, [])

	function onUpdateChar() {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

		getCharacter(id).then((res) => {
			setChar(res)
			setProcess("confirmed")
		})
	}

	return (
		<div className='randomchar'>
			{setContent(process, false, true)}
			{
				<CSSTransition
					in={process === "confirmed"}
					timeout={2000}
					classNames='randomchar__animate'
					unmountOnExit
				>
					<View data={char} />
				</CSSTransition>
			}
			<div className='randomchar__static'>
				<p className='randomchar__title'>
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button
					className='button button__main'
					onClick={onUpdateChar}
					disabled={process === "loading"}
				>
					<div className='inner'>{process === "loading" ? "loading..." : "try it"}</div>
				</button>
				<img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
			</div>
		</div>
	)
}

const getDescription = (str) => {
	let desc = ""

	if (str.split(" ").length > 20) {
		for (let i = 0; i <= 20; i++) {
			desc += `${str.split(" ")[i]} `
		}

		desc = desc.slice(0, -1) + "..."
	}

	return desc || str
}

const View = ({ data }) => {
	const { name, description, thumbnail, homepage, wiki } = data,
		imgStyle = thumbnail.indexOf("image_not_available")
			? "object-fit: contain"
			: "object-fit: cover"

	return (
		<div className='randomchar__block'>
			<img src={thumbnail} alt={name} className='randomchar__img' style={{ imgStyle }} />
			<div className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>{getDescription(description)}</p>
				<div className='randomchar__btns'>
					<a href={homepage} className='button button__main'>
						<div className='inner'>homepage</div>
					</a>
					<a href={wiki} className='button button__secondary'>
						<div className='inner'>Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar
