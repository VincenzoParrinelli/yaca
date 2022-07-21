import { useMemo } from "react"
import { useSelector } from "react-redux"

const useSelectedGroup = (selectedGroupID) => {

    const { groupList } = useSelector(state => state.group)

    //by memoizing, the find method will not get called everytime the user swaps to a different settings tab
    const selectedGroup = useMemo(() => {

        return groupList.find(group => group._id === selectedGroupID)

    }, [selectedGroupID])

    return selectedGroup

}

export default useSelectedGroup