import { getGroup } from "../groupSlice"

const groupMiddleware = store => next => action => {

    next(action)

    // if (action.type === "conversation/setSelectedConv") {

    //     store.dispatch({
    //         type: "group/resetSelectedGroupID"
    //     })

    // }

    // if (action.type === "group/setSelectedGroupID") {

    //     store.dispatch({
    //         type: "conversation/resetSelectedConv"
    //     })

    //     const { groupList, selectedGroupID } = store.getState().group

    //     const groupExists = groupList.some(group => group.isFullyFetched)

    //     if (!groupExists) store.dispatch(getGroup({ selectedGroupID }))

    // }

    // if (action.type === "group/setSelectedGroupData") {

    //     const group = action.payload

    //     //if (!group) return store.dispatch()

    //     // *-*-*-*-ALREADY FETCHED
    //     if (!group?.isFullyFetched) store.dispatch(getGroup(group._id))

    // }

}

export default groupMiddleware