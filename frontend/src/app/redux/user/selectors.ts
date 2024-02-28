import { RootState } from '../store'

export const selectUser = (state: RootState) => {
  return state.user.data
}

export const selectUserIsAuthorized = (state: RootState) => {
  return state.user.status === 'authorized'
}
