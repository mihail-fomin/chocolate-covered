import { configureStore } from '@reduxjs/toolkit'
import { categorySlice } from './feature/category/categorySlice'
import { cartMiddleware, cartSlice } from './feature/cart/cartSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      category: categorySlice.reducer,
      cart: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cartMiddleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
