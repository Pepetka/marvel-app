import react from "react"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"

import AppHeader from "../appHeader/AppHeader"
import Spinner from "../spinner/Spinner"

import "../../style/style.scss"

const MainPage = react.lazy(() => import("../pages/MainPage"))
const ComicsPage = react.lazy(() => import("../pages/ComicsPage"))
const SingleComicPage = react.lazy(() => import("../pages/SingleComicPage"))
const SingleCharPage = react.lazy(() => import("../pages/SingleCharPage"))
const Page404 = react.lazy(() => import("../pages/404"))

const App = () => {
	return (
		<react.Suspense fallback={<Spinner />}>
			<Router>
				<div className='app'>
					<AppHeader />
					<main>
						<AnimationApp />
					</main>
				</div>
			</Router>
		</react.Suspense>
	)
}

const AnimationApp = () => {
	const location = useLocation()
	const redirect = location.pathname === "/"

	return (
		<>
			{redirect ? <Navigate replace to='/characters' /> : null}
			<SwitchTransition mode='out-in'>
				<CSSTransition
					timeout={1000}
					classNames='animationApp'
					key={location.pathname}
					unmountOnExit
				>
					<Routes location={location}>
						<Route path='/characters' element={<MainPage />} />
						<Route path='/characters/:charId' element={<SingleCharPage />} />
						<Route path='/comics' element={<ComicsPage />} />
						<Route path='/comics/:comicId' element={<SingleComicPage />} />
						<Route path='*' element={<Page404 />} />
					</Routes>
				</CSSTransition>
			</SwitchTransition>
		</>
	)
}

export default App
