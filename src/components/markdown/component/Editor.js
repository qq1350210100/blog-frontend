import React from 'react'
import style from '../style/index.module.scss'

function _Editor(props, ref) {
  return (
    <article className={style.editor}>
      <textarea
        ref={ref}
        value={props.content}
        onChange={props.handleInput}
        onMouseEnter={props.handleEnterEditor}
        onMouseLeave={props.handleLeave}
        onScroll={props.handleScrollEditor}
      ></textarea>
    </article>
  )
}

const Editor = React.memo(React.forwardRef(_Editor))

export default Editor