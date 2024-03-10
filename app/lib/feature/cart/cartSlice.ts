import { createSlice } from '@reduxjs/toolkit'
import { Product } from '@prisma/client'

export interface CartItem extends Product {
  quantity: number
}

const initialState = {
  items: [] as CartItem[],
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
    removeFromCart: (state, action) => {
      const { id } = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === id)
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1)
      }
    },
  },
})

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions
