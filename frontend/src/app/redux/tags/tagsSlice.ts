import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITag } from '../../common/interfaces'
import { getTags } from '../../api'

const initialState: {
  list: ITag[]
  status: string
} = {
  list: [],
  status: 'loading',
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<ITag[]>) => {
      state.list = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchTags.pending,
        (
          state: {
            list: ITag[]
            status: string
          },
        ) => {
          state.status = 'loading'
        },
      )
      .addCase(
        fetchTags.fulfilled,
        (
          state: {
            list: ITag[]
            status: string
          },
          action: any,
        ) => {
          state.list = action.payload
          state.status = 'loaded'
        },
      )
  },
})

export const fetchTags = createAsyncThunk('categories/fetchTags', async () => {
  try {
    return await getTags()
  } catch (error: any) {
    return error.message
  }
})

export const { setTags } = tagsSlice.actions

export default tagsSlice.reducer
