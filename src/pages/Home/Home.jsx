import React from "react"

import Styles from "./Home.module.scss"

import Card from "../../Components/Card"

function Home(props) {
  const renderItems = () => {
    const filteredItems = props.items.filter((item) =>
      item.lotName.toLowerCase().includes(props.searchValue.toLowerCase())
    )
    return (props.isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onAdd={(obj) => props.onAddToCart(obj)}
        onFavorite={(obj) => props.onAddToFavs(obj)}
        favorited={props.favorites.some((obj) => Number(obj.id) === Number(item.id))}
        loading={props.isLoading}
        {...item}
      />
    ))
  }

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
                props.setSearchValue("")
              }}
              alt="Clear"
            />
          )}
          <input placeholder="Поиск..." value={props.searchValue} onChange={props.searchHandler} />
        </div>
      </div>
      <div className={Styles.items}>{renderItems()}</div>
    </div>
  )
}

export default Home
