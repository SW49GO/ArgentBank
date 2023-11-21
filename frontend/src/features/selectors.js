// UserDatasSlice Selectors

export const selectEmail = (state)=>state.userDatasSlice.email
export const selectFirstname = (state)=>state.userDatasSlice.firstname
export const selectLastname = (state)=>state.userDatasSlice.lastname
export const selectPassword = (state)=>state.userDatasSlice.password
export const selectAuth = (state)=>state.userDatasSlice.authentified


// IsVisibleComponent Selectors

export const selectEditName = (state)=>state.isVisibleComponent.editname
export const selectSummary = (state)=>state.isVisibleComponent.summary
export const selectChecking = (state)=>state.isVisibleComponent.checking
export const selectSaving = (state)=>state.isVisibleComponent.saving
export const selectCredit = (state)=>state.isVisibleComponent.credit