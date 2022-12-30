export const getReceiverDataFromConv = (conv, currentUserID) => conv.members.find(member => member._id !== currentUserID)

