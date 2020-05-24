import React, { memo, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import { flexCenter } from 'utils/styles'
import { Button, Link } from 'ui'

const useStyles = makeStyles({
	root: {
		...flexCenter,
		width: '100%'
	},
	promptWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 320,
		height: 136
	},
	operationWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '60%'
	}
})

export default memo(function NotFound(props) {
	const {} = props
	const history = useHistory()
	const classes = useStyles()

	const handleGoback = useCallback(() => {
		history.goBack()
	}, [history])

	return (
		<div className={classes.root}>
			<div className={classes.promptWrapper}>
				<h1>页面找不到啦...</h1>

				<div className={classes.operationWrapper}>
					<Button onClick={handleGoback}>后退</Button>
					<Link to="/">
						<Button color="primary">返回首页</Button>
					</Link>
				</div>
			</div>
		</div>
	)
})