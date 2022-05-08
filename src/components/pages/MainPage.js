import react from "react"
import { Helmet } from "react-helmet"

import RandomChar from "../randomChar/RandomChar"
import CharList from "../charList/CharList"
import CharInfo from "../charInfo/CharInfo"
import CharForm from "../charForm/CharForm"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"

import decoration from "../../resources/img/vision.png"

const MainPage = () => {
	const [currentCharId, setCurrentCharId] = react.useState(null)

	function onSelectChar(selectId) {
		setCurrentCharId(selectId)
	}

	return (
		<div>
			<Helmet>
				<meta name='description' content='Marvel information portal' />
				<title>Marvel information portal</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className='char__content'>
				<ErrorBoundary>
					<CharList onSelectChar={onSelectChar} currentCharId={currentCharId} />
				</ErrorBoundary>
				<div>
					<ErrorBoundary>
						<CharInfo currentCharId={currentCharId} />
					</ErrorBoundary>
					<ErrorBoundary>
						<CharForm />
					</ErrorBoundary>
				</div>
			</div>
			<img className='bg-decoration' src={decoration} alt='vision' />
		</div>
	)
}

export default MainPage
