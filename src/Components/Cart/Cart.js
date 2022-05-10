import React from "react"

import Styles from "./Cart.module.scss"

function Cart({onClose, items, onRemove}) {
  return (
    <div className={Styles.cart}>
      <div className={Styles.overlay} onClick={onClose} />
      <div className={Styles.cartSection}>
        <div className={Styles.hat}>
          <h2>Корзина</h2>
          <img
            className={Styles.btn__cancel}
            src="/assets/btn-cancel.svg"
            alt="Close"
            onClick={onClose}
          />
        </div>

        {items.length > 0 ? (
          <div className={Styles.cartFull}>
            <div className={Styles.items}>
              {items.map((obj) => (
                <div className={Styles.cartItem} key={obj.id}>
                  <div
                    className={Styles.cartItemImg}
                    style={{backgroundImage: `url(${obj.image})`}}
                  />
                  <div className={Styles.card__textItem}>
                    <p>{obj.lotName}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    className={Styles.btn__cancel}
                    src="/assets/btn-cancel.svg"
                    alt="Remove"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>

            <div className={Styles.cartBottom}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div className={Styles.line__dashed} />
                  <b>12 999 руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div className={Styles.line__dashed} />
                  <b>650 руб.</b>
                </li>
              </ul>
              <img src="/assets/cart-arrow.svg" alt="Arrow" />
              <button>Оформить заказ</button>
            </div>
          </div>
        ) : (
          <div className={Styles.cartEmpty}>
            <img className={Styles.cartImage} src="/assets/cartBox.svg" alt="Box" />
            <h2>Корзина пуста</h2>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button onClick={onClose}>
              <img src="/assets/cartEmptyBtnArrow.svg" alt="Arrow" /> Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
