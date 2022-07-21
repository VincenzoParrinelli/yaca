import { useMemo } from "react"
import { useSelector } from "react-redux"

let prevSelectedID

const useSelectedGroup = (selectedGroupID = prevSelectedID) => {

    const { groupList } = useSelector(state => state.group)

    //by memoizing, the find method will not get called everytime the user swaps to a different settings tab
    const selectedGroup = useMemo(() => {

        prevSelectedID = selectedGroupID

        return groupList.find(group => group._id === selectedGroupID)

    }, [selectedGroupID])

    return selectedGroup

}

export default useSelectedGroup