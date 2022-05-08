import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonRandomChar = (props) => (
	<ContentLoader
		speed={2}
		width={480}
		height={180}
		viewBox='0 0 480 180'
		backgroundColor='#9f9f9f'
		foregroundColor='#ecebeb'
		{...props}
	>
		<rect x='35' y='0' rx='0' ry='0' width='180' height='180' />
		<rect x='243' y='4' rx='0' ry='0' width='200' height='22' />
		<rect x='243' y='54' rx='0' ry='0' width='270' height='14' />
		<rect x='243' y='72' rx='0' ry='0' width='270' height='14' />
		<rect x='243' y='90' rx='0' ry='0' width='270' height='14' />
		<rect x='243' y='108' rx='0' ry='0' width='270' height='14' />
		<rect x='243' y='142' rx='0' ry='0' width='101' height='38' />
		<rect x='374' y='142' rx='0' ry='0' width='101' height='38' />
	</ContentLoader>
)

export default SkeletonRandomChar
