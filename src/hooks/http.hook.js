import react from "react"

export const useHttp = () => {
	const [process, setProcess] = react.useState("waiting")

	const request = react.useCallback(
		async (url, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {
			setProcess("loading")

			try {
				const response = await fetch(url, { method, body, headers })

				if (!response.ok) {
					throw new Error(`Could not fetch ${url}, status: ${response.status}`)
				}

				const data = await response.json()
				return data
			} catch (e) {
				setProcess("error")

				throw e
			}
		},
		[]
	)

	return { request, process, setProcess }
}
