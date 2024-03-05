import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getGroups } from '../../api'
import { IGroup } from '../../common/interfaces'

const initialState: {
  list: IGroup[]
  status: string
} = {
  list: [],
  status: 'loading',
}

export const groupsSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    createGroup: (state, action: PayloadAction<IGroup[]>) => {
      state.list = action.payload
      state.status = 'loaded'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGroups.pending, (state: { list: IGroup[]; status: string }) => {
        state.status = 'loading'
      })
      .addCase(
        fetchGroups.fulfilled,
        (
          state: {
            list: IGroup[]
            status: string
          },
          action: any,
        ) => {
          if (action.payload) {
            state.list = action.payload
            state.status = 'loaded'
          } else {
            state.list = initialState.list
            state.status = 'loading'
          }
        },
      )
  },
})

export const fetchGroups = createAsyncThunk('categories/fetchGroups', async () => {
  try {
    return await getGroups()
  } catch (error: any) {
    return error.message
  }
})

export const { createGroup } = groupsSlice.actions

export default groupsSlice.reducer
