import Skeleton from "../components/skeleton/Skeleton"
import SkeletonRandomChar from "../components/skeleton/SkeletonRandomChar"
import Spinner from "../components/spinner/Spinner"
import ErrorMessage from "../components/errorMessage/ErrorMessage"

const setContent = (
	process,
	isSkeletonWaiting = false,
	isSkeletonLoading = false,
	Component = null,
	data = null
) => {
	switch (process) {
		case "waiting":
			return isSkeletonWaiting ? <Skeleton /> : <Spinner />

		case "loading":
			return isSkeletonLoading ? <SkeletonRandomChar /> : <Spinner />

		case "confirmed":
			return Component ? <Component data={data} /> : null

		case "error":
			return <ErrorMessage />

		default:
			break
	}
}

export default setContent
