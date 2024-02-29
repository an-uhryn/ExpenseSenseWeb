import { RootState } from '../store'

export const selectAllGroups = (state: RootState) => {
  return state.groups.list
}
