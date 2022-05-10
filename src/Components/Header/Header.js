import React from "react"
import {Link} from "react-router-dom"

import Styles from "./Header.module.scss"

function Header(props) {
  return (
    <header>
      <Link to="/">
        <div className={Styles.logo}>
          <img src="/assets/logo.svg" alt="Logo" />
          <div className={Styles.logoInfo}>
            <h2>REACT SNEAKERS</h2>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className={Styles.profile}>
        <li onClick={props.onCartOpen}>
          <img src="/assets/cart.svg" alt="Корзина" />
          <span>1205 руб.</span>
        </li>
        <li>
          <Link to="favorite">
            <img src="/assets/favorite.svg" alt="Избранное" />
          </Link>
        </li>
        <li>
          <img src="/assets/user.svg" alt="Аккаунт" />
        </li>
      </ul>
    </header>
  )
}

export default Header
