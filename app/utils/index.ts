import { CartItem } from '../lib/feature/cart/cartSlice'

export const getDefaultValue = (currentPath: string) => {
  if (currentPath === '/') {
    return 'home'
  } else {
    return 'categories'
  }
}

export const getTotalPrice = (products: CartItem[]) => {
  return products.reduce(
    (accumulator, item) => accumulator + item.quantity * item.price,
    0,
  )
}
