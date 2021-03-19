import { createSelector } from 'reselect'

const users = state => state.user

export const selectCurrentUser = createSelector(
    [users],
    user=>user.currentUser
)