import { useFetch } from '@/utils/hooks'
import React from 'react'
import { List } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import * as articleApi from '@/apis/article'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { Skeleton } from '@/components/base'

/**
 * 文章列表。
 * 展示：
 * - 标题
 * - 作者
 * - 发布时间
 * - 简介
 * 跳转到文章详情
 * @param {{sortBy: 'latest | popular | random'}} props
 * @returns
 */
function ArticleList(props) {
	const { sortBy } = props
	const { t } = useTranslation()
	const theme = useSelector(state => state.setting.theme)

	const { data, loading } = useFetch(async () => articleApi.fetchList({ sortBy }), {
		initialData: [],
		ready: !!sortBy,
		refreshDeps: [sortBy]
	})

	const listElement = data.map(article => {
		const { id, title, author, category, introduce, backgroundImage, creationTime } = article
		return (
			<Link key={id} to={`/article/${category}/detail/${id}`}>
				<List.Item className={style.article_item} hovered ripple>
					<div className={style.inner}>
						<div className={style.left_wrapper}>
							<div>
								<span>
									{/* TODO: 路由到作者详情页 */}
									{/* <Link to="/user">{author}</Link> */}
									{author}
								</span>
								<span>-</span>
								<span>
									{dayjs(creationTime).isValid && dayjs(creationTime).format(`${t('article_detail.create_date')}`)}
								</span>
							</div>
							<h3 className={clsx(style[`heading_${theme}`])}>{title}</h3>
							{introduce && <span>{introduce}</span>}
						</div>
						<img src={backgroundImage} alt="" />
					</div>
				</List.Item>
			</Link>
		)
	})

	const skeletonElement = (
		<div className={style.skeleton_list}>
			{Object.keys([...Array(8)]).map(item => (
				<div className={style.skeleton_wrapper} key={item}>
					<div className={style.left_wrapper}>
						<Skeleton className={style.text_skeleton} />
						<Skeleton className={style.title_skeleton} />
						<Skeleton className={style.text_skeleton} />
						<Skeleton className={style.text_skeleton} />
					</div>
					<Skeleton className={style.img_skeleton} />
				</div>
			))}
		</div>
	)

	return <List className={style.article_list}>{loading ? skeletonElement : listElement}</List>
}

export default ArticleList
