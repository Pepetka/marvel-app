import { Helmet } from "react-helmet"

import AppBanner from "../appBanner/AppBanner"
import ComicsList from "../comicsList/ComicsList"

const ComicsPage = () => {
	return (
		<div>
			<Helmet>
				<meta name='description' content='Comics list page' />
				<title>Comics list page</title>
			</Helmet>
			<AppBanner />
			<ComicsList />
		</div>
	)
}

export default ComicsPage
