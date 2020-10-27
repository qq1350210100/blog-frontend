import React from 'react'
import ReactDOM from 'react-dom'
import style from '../style/index.module.scss'
import { v4 as uuid } from 'uuid'
import clsx from 'clsx'
import { Info, Warning, Error, CheckCircle } from '@material-ui/icons'

// 组件的 add 方法需要对外暴露
let add

function MessageContainer() {
	// { id, content, type, duration }
	const [msgList, setMsgList] = React.useState([])

	const remove = msg => {
		setMsgList(prev => prev.filter(item => item.id !== msg.id))
	}

	add = msg => {
		const newMsg = { ...msg, id: uuid() }
		const duration = msg.duration || 2500

		setMsgList(prev => {
			prev.forEach(item => {
				if (item.content === newMsg.content && item.type === newMsg.type) {
					remove(item)
				}
			})
			return [...prev, newMsg]
		})
		setTimeout(() => {
			remove(newMsg)
		}, duration)
	}

	return (
		<ul id={style.message_wrapper}>
			{msgList.map(msg => (
				<Message key={msg.id} remove={remove} {...msg} />
			))}
		</ul>
	)
}

const Message = React.memo(props => {
	const { type, content, remove } = props
	const distinguishType = () => {
		switch (type) {
			case 'success':
				return {
					messageIcon: <CheckCircle />,
					typeCls: style.success
				}
			case 'warning':
				return {
					messageIcon: <Warning />,
					typeCls: style.warning
				}
			case 'error':
				return {
					messageIcon: <Error />,
					typeCls: style.error
				}
			default:
				return {
					messageIcon: <Info />,
					typeCls: style.info
				}
		}
	}
	const { messageIcon, typeCls } = distinguishType()
	const messageCls = clsx(style.message, typeCls)
	return (
		<li className={messageCls} onClick={() => remove(props)}>
			{messageIcon}
			<span>{content}</span>
		</li>
	)
})

// MessageContainer append 到 #root 外，确保唯一且不会触发业务组件树渲染
{
	let elem = document.querySelector('#extra-container')
	if (!elem) {
		elem = document.createElement('div')
		elem.id = 'extra-container'
		document.body.append(elem)
	}
	ReactDOM.render(<MessageContainer />, elem)
}

const message = {
	info(content, duration) {
		add({ type: 'info', content, duration })
	},
	success(content, duration) {
		add({ type: 'success', content, duration })
	},
	warning(content, duration) {
		add({ type: 'warning', content, duration })
	},
	error(content, duration) {
		add({ type: 'error', content, duration })
	}
}

export default message