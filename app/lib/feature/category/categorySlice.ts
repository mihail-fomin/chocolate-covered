import { createSlice } from '@reduxjs/toolkit'

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
