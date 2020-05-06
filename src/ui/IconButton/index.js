import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../TouchRipple'
import { useRipple } from '../utils/hooks'
import themeColors from '../utils/themeColors'

const useStyles = makeStyles({
	root: ({ color, disabled }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		whiteSpace: 'nowrap',
		width: 40,
		height: 40,
		color: color.text,
		fontSize: 16,
		background: 'transparent',
		outline: 0,
		border: 0,
		borderRadius: '50%',
		opacity: disabled && .5,
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'all 0.25s ease-out',

		'&:hover': {
			background: disabled || color.dim,
		},
	}),
})

export default React.memo(function IconButton(props) {

	const { children, className, disabled = false, onClick = null } = props

	const color = 'transparent'

	const classes = useStyles({ disabled, color: themeColors[color] })

	const { rippleRef, handleStart, handleStop } = useRipple()

	const beNull = value => disabled ? null : value

	return (
		<div
			className={clsx(classes.root, className)}
			onClick={beNull(onClick)}
			onMouseDown={beNull(handleStart)}
			onMouseUp={beNull(handleStop)}
		>
			{beNull(<TouchRipple ref={rippleRef} color={color} center={true} timeout={500} />)}
			{children}
		</div>
	)
})