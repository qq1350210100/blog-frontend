import React from 'react'
import style from '../style/index.module.scss'
import { Form, Input, Button, Loading } from 'sylas-react-ui'
import { CloseOutlined } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import * as commonAction from '@/store/actions'
import * as action from '../store/action'
import Register from './Register'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { msg } from '@/components/base'
import * as userApi from '@/apis/user'
import { useBoolean } from '@/utils/hooks'
import { debounce } from '@/utils'

export default function Login() {
	const dispatch = useDispatch()
	const changeInterval = 400

	const [avatarSrc, setAvatarSrc] = React.useState(defaultAvatar)
	const [loading, { setTrue, setFalse }] = useBoolean(false)

	const handleClose = () => {
		dispatch(action.updateModal(false, null))
	}

	const handleGoRegister = () => {
		dispatch(action.updateModal(true, <Register />))
	}

	const handleValuesChange = debounce(values => {
		if (values.username) {
			;(async () => {
				setTrue()
				try {
					const { message, payload } = await userApi.fetchProfile(values.username)
					if (message === 'ok') {
						setAvatarSrc(payload.avatar)
					}
				} catch (err) {
					setAvatarSrc(defaultAvatar)
				}
				setFalse(false)
			})()
		}
	}, changeInterval)

	const handleSubmit = values => {
		console.log('values: ', values)
		const { username, password } = values
		if (!username || !password) {
			msg.error('请输入完整的账号和密码')
			return
		}
		dispatch(commonAction.userLogin({ username, password }))
	}

	return (
		<div className={style.login_wrapper}>
			<h1>用户登陆</h1>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseOutlined />
			</Button.Icon>
			<div className={style.avatar_wrapper}>{loading ? <Loading.Bounce /> : <img alt="" src={avatarSrc} />}</div>
			<Form onFinished={handleSubmit} onValuesChange={handleValuesChange}>
				<Form.Item label="用户名" name="username">
					<Input placeholder="用户名" />
				</Form.Item>
				<Form.Item label="密码" name="password">
					<Input.Password placeholder="密码" />
				</Form.Item>
				<div className={style.footer}>
					<span className={style.register} onClick={handleGoRegister}>
						没有账号？点击注册
					</span>
					<Button htmlType="submit" color="primary">
						确认登录
					</Button>
				</div>
			</Form>
		</div>
	)
}