import React from "react"
import ContentLoader from "react-content-loader"

import "./skeleton.scss"

const Skeleton = (props) => {
	return (
		<>
			<p className='char__select'>Please select a character to see information</p>
			<ContentLoader
				className='skeleton'
				speed={2}
				width={425}
				height={360}
				viewBox='0 0 425 360'
				backgroundColor='#9f9f9f'
				foregroundColor='#ecebeb'
				{...props}
			>
				<rect x='0' y='0' rx='0' ry='0' width='150' height='150' />
				<rect x='175' y='0' rx='0' ry='0' width='170' height='30' />
				<rect x='175' y='64' rx='0' ry='0' width='101' height='38' />
				<rect x='175' y='112' rx='0' ry='0' width='101' height='38' />
				<rect x='0' y='167' rx='0' ry='0' width='300' height='14' />
				<rect x='0' y='185' rx='0' ry='0' width='300' height='14' />
				<rect x='0' y='203' rx='0' ry='0' width='300' height='14' />
				<rect x='0' y='231' rx='0' ry='0' width='70' height='24' />
				<rect x='0' y='265' rx='0' ry='0' width='375' height='25' />
			</ContentLoader>
		</>
	)
}

export default Skeleton
