import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    activeCategory: 'chocolate',
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload.categoryName
    },
  },
})

export const { setActiveCategory } = categorySlice.actions
export const selectActiveCategoryName = (state: RootState) =>
  state.category.activeCategory
