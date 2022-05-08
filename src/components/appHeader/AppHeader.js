import { NavLink } from "react-router-dom"

import "./appHeader.scss"

const AppHeader = () => {
	return (
		<header className='app__header'>
			<h1 className='app__title'>
				<NavLink end to='/characters'>
					<span>Marvel</span> information portal
				</NavLink>
			</h1>
			<nav className='app__menu'>
				<ul>
					<li
						onFocus={(e) => e.target.classList.add("app__header_focus")}
						onBlur={(e) => e.target.classList.remove("app__header_focus")}
					>
						<NavLink
							exact='false'
							style={({ isActive }) => ({ color: isActive ? "#9F0013" : "inherit" })}
							to='/characters'
						>
							Characters
						</NavLink>
					</li>
					/
					<li
						onFocus={(e) => e.target.classList.add("app__header_focus")}
						onBlur={(e) => e.target.classList.remove("app__header_focus")}
					>
						<NavLink
							exact='false'
							style={({ isActive }) => ({ color: isActive ? "#9F0013" : "inherit" })}
							to='/comics'
						>
							Comics
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader
