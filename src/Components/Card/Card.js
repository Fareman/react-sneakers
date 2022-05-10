import React, {useState} from "react"

import ContentLoader from "react-content-loader"

import Styles from "./Card.module.scss"

import AppContext from "../../context"

function Card({
  id,
  price,
  lotName,
  image,
  favorited = false,
  added = false,
  loading = false,
  ...props
}) {
  const {isItemAdded} = React.useContext(AppContext)
  const [favorite, setFavorite] = useState(favorited)

  const onAddClick = () => {
    props.onAdd({id, lotName, image, price})
  }

  const onLikeClick = () => {
    props.onFavorite({id, lotName, image, price})
    setFavorite(!favorite)
  }

  return (
    <div className={Styles.cardWrapper}>
      {loading ? (
        <ContentLoader
          speed={1}
          width={150}
          height={206}
          viewBox="0 0 150 206"
          backgroundColor="#fafafa"
          foregroundColor="#e0f3ff">
          <rect x="0" y="0" rx="10" ry="10" width="150" height="112" />
          <rect x="0" y="125" rx="3" ry="5" width="150" height="15" />
          <rect x="0" y="143" rx="3" ry="5" width="90" height="15" />
          <rect x="118" y="174" rx="8" ry="8" width="32" height="32" />
          <rect x="0" y="180" rx="8" ry="8" width="80" height="24" />
        </ContentLoader>
      ) : (
        <div>
          <img
            className={Styles.favButton}
            src={favorite ? "/assets/btn-liked.svg" : "/assets/btn-unliked.svg"}
            onClick={onLikeClick}
            alt="Favorite"
          />
          <img className={Styles.lotImage} src={image} alt={lotName} />
          <h5>{lotName}</h5>
          <div className={Styles.cardBottom}>
            <div className={Styles.priceTag}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              className={Styles.addButton}
              src={isItemAdded(id) ? "/assets/btn-checked.svg" : "/assets/btn-unchecked.svg"}
              onClick={onAddClick}
              alt="Add"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Card
