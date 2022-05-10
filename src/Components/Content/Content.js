import React from "react"

import Styles from "./Content.module.scss"

function Content(props) {
  return (
    <div className={Styles.content}>
      <div className={Styles.title}>
        <h1>{props.searchValue ? `Поиск по запросу: "${props.searchValue}"` : "Все кроcсовки"}</h1>
        <div className={Styles.searchBlock}>
          <img src="/assets/search.svg" alt="Search" />
          {props.searchValue && (
            <img
              className={Styles.btnClear}
              src="/assets/btn-cancel.svg"
              onClick={() => {
                props.onClickClear("")
              }}
              alt="Close"
            />
          )}
          <input placeholder="Поиск..." value={props.searchValue} onChange={props.searchHandler} />
        </div>
      </div>
      <div className={Styles.items}>{props.children}</div>
    </div>
  )
}

export default Content
