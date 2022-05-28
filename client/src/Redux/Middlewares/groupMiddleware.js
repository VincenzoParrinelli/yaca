import { getGroup } from "../groupSlice"

const resetSelectedIDsMiddleware = store => next => action => {

    if (action.type === "conversation/setSelectedConv") {

        store.dispatch({
            type: "group/resetSelectedGroupID"
        })

    }

    if (action.type === "group/setSelectedGroupID") {

        store.dispatch({
            type: "conversation/resetSelectedConv"
        })

        const { groupList, selectedGroupID } = store.getState().group
        const { data } = store.getState().user

        const groupExists = groupList.some(group => group._id.includes(selectedGroupID))

        if (!groupExists) {

            store.dispatch(getGroup(data._id))

        } else {

        }

    }

    next(action)
}

export default resetSelectedIDsMiddleware