import { RootState } from '../store'

export const selectAllInvitations = (state: RootState) => state.invitations.asInviter

export const selectInviteeInvitations = (state: RootState) => state.invitations.asInvitee
