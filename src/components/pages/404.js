import { Helmet } from "react-helmet"

import ErrorMessage from "../errorMessage/ErrorMessage"

const Page404 = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Helmet>
				<meta name='description' content='Non-existent address' />
				<title>Non-existent address</title>
			</Helmet>
			<h2>404 - Page not found...</h2>
			<ErrorMessage />
		</div>
	)
}

export default Page404
