const User = require("../../models/User.js")

module.exports = (user, io) => {

    const fieldsToExclude = { createdAt: 0, password: 0 }

    user.on("update-username", async payload => {

        const { _id, newUsername, friendList } = payload

        friendList.forEach(friend => {

            io.to(friend.socketID).emit("receive-new-friend-username", { _id, newUsername })

        })

    })

    user.on("update-pro-pic", async payload => {

        const { userID, newProPicID } = payload

        await User.findByIdAndUpdate(userID, { profilePicID: newProPicID }).then(async userData => {

            await User.find({ "_id": { $in: userData.friendList } }).lean().then(async friendsData => {

                friendsData.forEach(friend => {

                    io.to(friend.socketID).emit("receive-friend-updated-pro-pic", { userID, newProPicID })

                })


            }).catch(err => console.error(err.message))

        })
    })

    user.on("send-friend-request", async usersID => {

        const { currentUserId, userToAddId } = usersID

        await User.findByIdAndUpdate(userToAddId, { friendRequests: currentUserId }).then(async userToAddData => {

            await User.findByIdAndUpdate(currentUserId, { friendRequestsPending: userToAddId })
                .select(fieldsToExclude)
                .then(currentUserData => {

                    io.to(currentUserData.socketID).emit("receive-pending-friend-request", userToAddId)

                    io.to(userToAddData.socketID).emit("receive-friend-request", currentUserData)

                }).catch(err => new Error(err.message))

        }).catch(err => new Error(err.message))
    })

    user.on("accept-friend-request", async usersID => {

        const { currentUserID, userToAcceptID } = usersID

        await User.findByIdAndUpdate(currentUserID, { $push: { friendList: [userToAcceptID], $pull: { friendRequests: [userToAcceptID], friendRequestsPending: [userToAcceptID] } } })
            .select(fieldsToExclude)
            .then(async currentUserData => {

                await User.findByIdAndUpdate(userToAcceptID, { $push: { friendList: [currentUserID], $pull: { friendRequestsPending: [currentUserID] } } })
                    .select(fieldsToExclude)
                    .then(userToAcceptData => {

                        io.to(currentUserData.socketID).emit("accept-friend-request", userToAcceptData)

                        io.to(userToAcceptData.socketID).emit("accept-friend-request", currentUserData)

                    }).catch(err => new Error(err.message))

            }).catch(err => new Error(err.message))


    })

    user.on("refuse-friend-request", async usersID => {

        const { currentUserID, userToRefuseID } = usersID

        await User.findByIdAndUpdate(currentUserID,

            { $pull: { friendRequests: userToRefuseID } }

        ).select(fieldsToExclude).then(async currentUserData => {

            await User.findByIdAndUpdate(
                userToRefuseID,
                { $pull: { friendRequestsPending: currentUserID } }

            ).select(fieldsToExclude).then(userToRefuseData => {

                io.to(currentUserData.socketID).emit("delete-friend-request", userToRefuseData._id)

                io.to(userToRefuseData.socketID).emit("delete-friend-request", currentUserData._id)

            }).catch(err => new Error(err.message))


        }).catch(err => new Error(err.message))

    })

}