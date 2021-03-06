import React from 'react'
import style from '../style/index.module.scss'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Affix } from '@/components/base'
import IndividualPanel from './IndividualPanel'
import AuthorPanel from './AuthorPanel'
import ArticleStatsPanel from './ArticleStatsPanel'
import config from '@/config'

function InternalRightSider() {
	const opened = useSelector(state => state.sider.drawerOpened)
	const rightSiderCls = clsx(style.right_sider, opened && style.narrowing)

	const rightSideRoutes = [
		{
			path: '/',
			component: (
				<Affix>
					<IndividualPanel />
				</Affix>
			)
		},
		{
			path: '/about',
			component: (
				<Affix>
					<IndividualPanel style={{ boxShadow: 'none' }} />
				</Affix>
			)
		},
		{
			path: '/article/:category/detail/:id',
			component: (
				<>
					<AuthorPanel />
					<Affix>
						<ArticleStatsPanel />
					</Affix>
				</>
			)
		}
	]

	return (
		<React.Suspense fallback="loading" maxDuration={config.LOADING_DELAY}>
			<Switch>
				{rightSideRoutes.map(({ path, component, ...rest }) => (
					<Route key={path} exact path={path} {...rest}>
						<aside className={rightSiderCls}>{component}</aside>
					</Route>
				))}
			</Switch>
		</React.Suspense>
	)
}

const RightSider = React.memo(InternalRightSider)
export default RightSider
