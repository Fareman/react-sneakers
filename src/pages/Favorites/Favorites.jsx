import React from "react"

import Styles from "./Favorites.module.scss"
import AppContext from "../../context"

import Card from "../../Components/Card"

function Favorite(props) {
  const {favorites, onAddToFavs = {onAddToFavs}} = React.useContext(AppContext)

  return (
    <div className={Styles.content}>
      <div className={Styles.title}>
        <h1>Мои закладки</h1>
      </div>
      <div className={Styles.items}>
        {favorites.map((item, index) => (
          <Card key={index} favorited={true} onFavorite={(obj) => onAddToFavs(obj)} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Favorite
