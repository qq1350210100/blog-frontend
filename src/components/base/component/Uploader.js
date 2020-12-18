import React, { useRef } from 'react'
import style from '../style/index.module.scss'
import { Button } from 'sylas-react-ui'
import ImageOutlineIcon from 'mdi-react/ImageOutlineIcon'
import { readFile } from '../util'

const dataFormat = {
	BASE_64: 'base64',
	FORM_DATA: 'formdata'
}

function Uploader(props) {
	const {
		classes,
		children = (
			<Button.Icon>
				<ImageOutlineIcon size={20} />
			</Button.Icon>
		),
		format = dataFormat.FORM_DATA,
		onChange,
		...rest
	} = props

	const fileInputRef = useRef()

	const handleSelect = () => {
		fileInputRef.current.click()
	}

	const handleChange = event => {
		const files = event.target.files

		if (format === dataFormat.BASE_64) {
			const fileList = Array.prototype.map.call(files, readFile)
			Promise.all(fileList).then(results => {
				onChange && onChange(results)
			})
		} else {
			const formData = new FormData()
			Array.prototype.forEach.call(files, file => {
				formData.append('image', file)
			})

			if (formData.get('image') && onChange) onChange(formData)
		}
	}

	return (
		<div className={style.uploader}>
			{React.cloneElement(children, { onClick: handleSelect })}
			<input ref={fileInputRef} type="file" multiple={false} accept="image/*" {...rest} onChange={handleChange} />
		</div>
	)
}

export default Uploader
