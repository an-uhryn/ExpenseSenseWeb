import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categories/categoriesSlice'
import tagsReducer from './tags/tagsSlice'
import expensesReducer from './expenses/expensesSlice'
import modalReducer from './modal/modalSlice'
import userReducer from './user/userSlice'
import groupReducer from './groups/groupsSlice'
import invitationReducer from './invitations/invitationsSlice'

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    tags: tagsReducer,
    expenses: expensesReducer,
    modal: modalReducer,
    user: userReducer,
    groups: groupReducer,
    invitations: invitationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
