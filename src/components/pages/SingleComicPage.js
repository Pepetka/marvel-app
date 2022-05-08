import { Helmet } from "react-helmet"

import SingleComic from "../singleComic/SingleComic"
import AppBanner from "../appBanner/AppBanner"

const SingleComicPage = () => {
	return (
		<div>
			<Helmet>
				<meta name='description' content='Single comic page' />
				<title>Single comic page</title>
			</Helmet>
			<AppBanner />
			<SingleComic />
		</div>
	)
}

export default SingleComicPage
