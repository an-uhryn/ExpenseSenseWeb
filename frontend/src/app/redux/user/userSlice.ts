import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUser } from '../../api'

interface IUser {
  displayName: string
  emails: { value: string }[]
  id: string
  name: { familyName: string; givenName: string }
  photos: { value: string }[]
  provider: string
  _json?: any
  _raw?: string
}

interface IUserState {
  data: IUser
  status: string
}

const initialState: IUserState = {
  data: {
    displayName: '',
    emails: [],
    id: '',
    name: { familyName: '', givenName: '' },
    photos: [],
    provider: 'google',
  },
  status: 'unauthorized',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload
      state.status = 'loaded'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state: IUserState) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state: IUserState, action: any) => {
        if (action.payload) {
          state.data = action.payload
          state.status = 'authorized'
        } else {
          state.data = initialState.data
          state.status = 'unauthorized'
        }
      })
  },
})

export const fetchUser = createAsyncThunk('categories/fetchUser', async () => {
  try {
    const response = await getUser()
    return response.user
  } catch (error: any) {
    return error.message
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
