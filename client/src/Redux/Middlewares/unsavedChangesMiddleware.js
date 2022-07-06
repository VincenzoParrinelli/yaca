const unsavedChangesMiddleware = store => next => action => {

    //this line avoids an infinite call stack
    if (action.type === "settings/closeUnsavedChangesAlert") return next(action)
    if (action.type === "resetOverviewSettings/reset") store.dispatch({ type: "settings/closeUnsavedChangesAlert" })

    //dispatch next action that changed the group settings state, so settingsOverviewState is updated with new state 
    next(action)

    const { isOpenFlag, unsavedChangesAlert } = store.getState().settings
    const settingsOverviewState = store.getState().settingsOverview

    const groupList = store.getState().group.groupList
    const selectedGroupID = store.getState().settings.selectedGroupID

    const selectedGroup = groupList.find(group => group._id === selectedGroupID)

    //if we got a change in group settings display the unsaved changes alert 
    if (isOpenFlag.groupSettings && !unsavedChangesAlert) {

        for (const setting in settingsOverviewState) {

            if (settingsOverviewState[setting]) store.dispatch({ type: "settings/openUnsavedChangesAlert" })

        }

    }

    //otherwise close it
    if (isOpenFlag.groupSettings && unsavedChangesAlert) {

        const removeNullishValues = Object.values(settingsOverviewState).filter(value => value)

        if (removeNullishValues.every(value => Object.values(selectedGroup).includes(value))) store.dispatch({ type: "settings/closeUnsavedChangesAlert" })

    }
}

export default unsavedChangesMiddleware