import react from "react"
import { CSSTransition } from "react-transition-group"

import "./charInfo.scss"
import useMarvelService from "../../services/MarvelService"
import setContent from "../../utils/setContent"

const CharInfo = (props) => {
	const [char, setChar] = react.useState(null)
	const { process, setProcess, getCharacter } = useMarvelService()

	react.useEffect(onUpdateChars, [props])

	function onUpdateChars() {
		if (!props.currentCharId) {
			return
		}

		getCharacter(props.currentCharId).then((res) => {
			onCharLoaded(res)
			setProcess("confirmed")
		})
	}

	function onCharLoaded(char) {
		setChar(char)
	}

	return (
		<div className='char__info'>
			{setContent(process, true)}
			<CSSTransition
				in={process === "confirmed"}
				timeout={2000}
				classNames='char__info-animate'
				unmountOnExit
			>
				<View data={char} />
			</CSSTransition>
		</div>
	)
}

const View = ({ data }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = data,
		comicsArr = comics.length ? (
			comics.slice(0, 10).map((item, i) => (
				<li className='char__comics-item' key={i}>
					{item.name}
				</li>
			))
		) : (
			<li className='char__comics-item'>Comics not found.</li>
		)

	const imgStyle = thumbnail.indexOf("image_not_available")
		? "object-fit: contain"
		: "object-fit: cover"

	return (
		<div>
			<div className='char__basics'>
				<img src={thumbnail} alt={name} style={{ imgStyle }} />
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>{description}</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>{comicsArr}</ul>
		</div>
	)
}

export default CharInfo
