import { getGroup } from "../groupSlice"
import { loadProPics } from "../helpers/firebase.helpers"

const groupMiddleware = store => next => action => {

    next(action)

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

        const groupExists = groupList.some(group => group.isFullyFetched)

        if (!groupExists) store.dispatch(getGroup({ selectedGroupID }))

    }

}

export default groupMiddleware