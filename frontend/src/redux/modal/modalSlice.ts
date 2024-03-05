import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: {
  isOpen: boolean
} = {
  isOpen: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
})

export const { setModalState } = modalSlice.actions

export default modalSlice.reducer
