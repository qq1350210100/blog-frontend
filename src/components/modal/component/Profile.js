import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input, Select } from 'sylas-react-ui'
import CloseIcon from 'mdi-react/CloseIcon'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'
import PersonIcon from 'mdi-react/PersonIcon'
import CheckCircleIcon from 'mdi-react/CheckCircleIcon'
import * as action from '../store/action'
import * as commonAction from '@/store/actions'
import * as fileApi from '@/apis/file'
import Register from './Register'
import { useBoolean } from '@/utils/hooks'
import { Uploader } from '@/components/base'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { msg } from '@/components/base'

export default function Profile(props) {
	const { account } = props

	const dispatch = useDispatch()
	const online = useSelector(state => state.online)
	const theme = useSelector(state => state.setting.theme)
	const [avatarSrc, setAvatarSrc] = React.useState(defaultAvatar)
	const [visible, { setTrue: handleShowUpload, setFalse: handleHideUpload }] = useBoolean(false)

	const handleReturn = () => {
		dispatch(action.updateModal(true, <Register />))
	}

	const handleClose = () => {
		dispatch(action.updateModal(false, null))
	}

	const handleRegister = values => {
		if (!values.nickname || !account) return

		const userInfo = {
			username: account.username,
			password: account.password,
			profile: {
				avatar: avatarSrc,
				nickname: values.nickname,
				gender: values.gender,
				selfIntroduction: values.selfIntroduction
			}
		}
		dispatch(commonAction.userRegister(userInfo))
		if (online) {
			handleClose()
		}
	}

	const handleAddAvatar = async formData => {
		try {
			const remotePicUrl = await fileApi.uploadImage(formData)
			setAvatarSrc(remotePicUrl)
		} catch (err) {
			console.error(`图片上传失败——${err}`)
			msg.error(err)
		}
	}

	return (
		<div className={style.profile_wrapper}>
			<h1>完善个人资料</h1>
			<Button.Icon className={style.return} onClick={handleReturn}>
				<ArrowBackIcon size={20} />
			</Button.Icon>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseIcon size={20} />
			</Button.Icon>
			<Uploader onChange={handleAddAvatar}>
				<div className={style.avatar_wrapper} onMouseEnter={handleShowUpload} onMouseLeave={handleHideUpload}>
					<img alt="" src={avatarSrc} />
					{visible && (
						<div className={style.upload_cover}>
							<PersonIcon size={20} />
						</div>
					)}
				</div>
			</Uploader>
			<Form onFinished={handleRegister}>
				<Form.Item label="名称" name="nickname">
					<Input color={theme} placeholder="你的名字（必填）" />
				</Form.Item>
				<Form.Item label="性别" name="gender" initialValue="male">
					<Select>
						<Select.Option color={theme} value="male">
							男
						</Select.Option>
						<Select.Option color={theme} value="female">
							女
						</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="个人简介" name="selfIntroduction">
					<Input color={theme} placeholder="技能、兴趣爱好（选填）" />
				</Form.Item>
				<Button className={style.complete} type="submit" color={theme} suffixes={<CheckCircleIcon size={20} />}>
					完成
				</Button>
			</Form>
		</div>
	)
}
