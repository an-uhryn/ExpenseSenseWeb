import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IExpense } from '../../common/interfaces'
import { getExpenses } from '../../api'

const initialState: {
  list: IExpense[]
  status: string
} = {
  list: [],
  status: 'loading',
}

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<IExpense[]>) => {
      state.list = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchExpenses.pending, (state: { list: IExpense[]; status: string }) => {
        state.status = 'loading'
      })
      .addCase(
        fetchExpenses.fulfilled,
        (
          state: {
            list: IExpense[]
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

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
  try {
    return await getExpenses()
  } catch (error: any) {
    return error.message
  }
})

export const { setExpenses } = expensesSlice.actions

export default expensesSlice.reducer
