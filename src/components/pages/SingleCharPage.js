import { Helmet } from "react-helmet"

import SingleChar from "../singleChar/SingleChar"
import AppBanner from "../appBanner/AppBanner"

const SingleCharPage = () => {
	return (
		<div>
			<Helmet>
				<meta name='description' content='Single character page' />
				<title>Single character page</title>
			</Helmet>
			<AppBanner />
			<SingleChar />
		</div>
	)
}

export default SingleCharPage
