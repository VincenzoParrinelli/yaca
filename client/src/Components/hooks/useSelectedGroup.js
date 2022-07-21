import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const useSelectedGroup = selectedGroupID => {
    
    const { groupList } = useSelector(state => state.group)

    const selectedGroup = groupList.find(group => group._id === selectedGroupID)

    return selectedGroup

}

export default useSelectedGroup