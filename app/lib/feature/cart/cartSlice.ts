import { createSlice, Middleware } from '@reduxjs/toolkit'
import { Product } from '@prisma/client'

export interface CartItem extends Product {
  quantity: number
}

export const cartMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action) // Call next middleware or reducer first

  if (
    action.type === 'cart/addToCart' ||
    action.type === 'cart/incrementQuantity' ||
    action.type === 'cart/decrementQuantity' ||
    action.type === 'cart/clearCart'
  ) {
    const cartState = store.getState().cart // Get the current cart state

    // Store the cart items in local storage
    localStorage.setItem('cart', JSON.stringify(cartState.items))
  }

  return result
}

const cartItems = typeof window !== 'undefined' ? localStorage.getItem('cart') : null
const parsedCartItems: CartItem[] = cartItems ? JSON.parse(cartItems) : []

const initialState = {
  items: parsedCartItems as CartItem[],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload
      const itemExists = state.items.find((item) => item.id === id)
      if (itemExists) {
        itemExists.quantity++
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity++
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === id)
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity === 1) {
          state.items.splice(itemIndex, 1)
        } else {
          state.items[itemIndex].quantity--
        }
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions
