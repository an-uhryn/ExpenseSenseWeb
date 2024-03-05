import { RootState } from '../store'

export const selectAllTags = (state: RootState) => state.tags.list
