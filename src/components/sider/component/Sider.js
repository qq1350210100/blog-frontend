import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'sylas-react-ui'
import { LeftOutlined } from '@ant-design/icons'
import style from '../style/index.module.scss'
import * as action from '@/components/sider/store/action'
import clsx from 'clsx'

export default function Sider() {
  const dispatch = useDispatch()
  const { drawerOpened } = useSelector(state => state.sider)

  const hanldeCloseDrawer = () => {
    dispatch(action.updateDrawer(false))
  }

  const asideCls = clsx([style.sider, drawerOpened && style.in])

  return (
    <aside className={asideCls}>
      <div className={style.top}>
        <Button.Icon onClick={hanldeCloseDrawer}>
          <LeftOutlined />
        </Button.Icon>
      </div>
    </aside>
  )
}
