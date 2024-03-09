import { configureStore } from '@reduxjs/toolkit'
import { categorySlice } from './feature/category/categorySlice'
import { cartSlice } from './feature/cart/cartSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      category: categorySlice.reducer,
      cart: cartSlice.reducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
