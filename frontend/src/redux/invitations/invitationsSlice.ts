import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInvitation } from '../../common/interfaces'
import { getInvitations, getInviteeInvitations } from '../../api'

const initialState: {
  asInviter: IInvitation[]
  asInvitee: IInvitation[]
  status: string
} = {
  asInviter: [],
  asInvitee: [],
  status: 'loading',
}

export const invitationsSlice = createSlice({
  name: 'invitations',
  initialState,
  reducers: {
    setInvitations: (state, action: PayloadAction<IInvitation[]>) => {
      state.asInviter = action.payload
      state.status = 'loaded'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchInvitations.pending, (state: { asInviter: IInvitation[]; status: string }) => {
        state.status = 'loading'
      })
      .addCase(
        fetchInvitations.fulfilled,
        (
          state: {
            asInviter: IInvitation[]
            status: string
          },
          action: any,
        ) => {
          state.asInviter = action.payload
          state.status = 'loaded'
        },
      )
      .addCase(
        fetchInviteeInvitations.pending,
        (state: { asInviter: IInvitation[]; status: string }) => {
          state.status = 'loading'
        },
      )
      .addCase(
        fetchInviteeInvitations.fulfilled,
        (
          state: {
            asInvitee: IInvitation[]
            status: string
          },
          action: any,
        ) => {
          state.asInvitee = action.payload
          state.status = 'loaded'
        },
      )
  },
})

export const fetchInvitations = createAsyncThunk('categories/fetchInvitations', async () => {
  try {
    return await getInvitations()
  } catch (error: any) {
    return error.message
  }
})

export const fetchInviteeInvitations = createAsyncThunk(
  'categories/fetchInviteeInvitations',
  async ({ id }: { id: string }) => {
    try {
      return await getInviteeInvitations({ id })
    } catch (error: any) {
      return error.message
    }
  },
)

export const { setInvitations } = invitationsSlice.actions

export default invitationsSlice.reducer
