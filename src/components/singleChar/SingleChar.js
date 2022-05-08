import react from "react"
import { useParams } from "react-router-dom"

import "./singleChar.scss"
import useMarvelService from "../../services/MarvelService"
import setContent from "../../utils/setContent"

const SingleChar = (props) => {
	const [char, setChar] = react.useState(null)
	const { process, setProcess, getCharacter } = useMarvelService()
	const { charId } = useParams()

	react.useEffect(onUpdateChar, [props])

	function onUpdateChar() {
		if (!charId) {
			return
		}

		getCharacter(charId).then((res) => {
			setChar(res)
			setProcess("confirmed")
		})
	}

	return <div className='single-char'>{setContent(process, false, false, View, char)}</div>
}

const View = ({ data }) => {
	const { name, description, thumbnail } = data

	return (
		<>
			<img src={thumbnail} alt={name} className='single-char__img' />
			<div className='single-char__info'>
				<h2 className='single-char__name'>{name}</h2>
				<p className='single-char__descr'>{description}</p>
			</div>
		</>
	)
}

export default SingleChar
