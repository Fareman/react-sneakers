import {useEffect, useState} from "react"
import axios from "axios"
import {Routes, Route} from "react-router-dom"

import AppContext from "./context"

import Cart from "./Components/Cart"
import Header from "./Components/Header"
import Home from "./pages/Home"
import Favorite from "./pages/Favorites"

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get(
        "https://624a7836fd7e30c51c0e098d.mockapi.io/sneakers/Items"
      )
      const cartResponse = await axios.get(
        "https://624a7836fd7e30c51c0e098d.mockapi.io/sneakers/cart"
      )
      const favoriteResponse = await axios.get(
        "https://624a7836fd7e30c51c0e098d.mockapi.io/sneakers/favorite"
      )

      setIsLoading(false)

      setCartItems(cartResponse.data)
      setFavorites(favoriteResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()
  }, [])

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((cartObj) => Number(cartObj.id) === Number(obj.id))) {
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        axios.delete(`https://624a7836fd7e30c51c0e098d.mockapi.io/sneakers/cart/${obj.id}`)
      } else {
        setCartItems((prev) => [...prev, obj])
        axios.post("https://624a7836fd7e30c51c0e098d.mockapi.io/sneakers/cart", obj)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
    axios.delete(`https://624a7836fd7e30c51c0e098d.mockapi.io/sneakers/cart/${id}`)
  }

  const onAddToFavs = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        axios.delete(`https://624a7836fd7e30c51c0e098d.mockapi.io/sneakers/favorite/${obj.id}`)
      } else {
        const {data} = await axios.post(
          "https://624a7836fd7e30c51c0e098d.mockapi.io/sneakers/favorite",
          obj
        )
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const searchHandler = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavs}}>
      <div className="wrapper">
        {cartOpened && (
          <Cart
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveFromCart}
          />
        )}

        <Header onCartOpen={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                favorites={favorites}
                isLoading={isLoading}
                searchValue={searchValue}
                searchHandler={searchHandler}
                onClickClear={setSearchValue}
                onAddToCart={onAddToCart}
                onAddToFavs={onAddToFavs}
                onRemoveFromCart={onRemoveFromCart}
              />
            }
          />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
