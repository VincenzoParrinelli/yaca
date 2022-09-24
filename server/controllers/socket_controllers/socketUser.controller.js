const User = require("../../models/User.js")

module.exports = (user, io) => {

    const fieldsToExclude = { createdAt: 0, password: 0 }

    user.on("search-user", async payload => {

        const { userID, username } = payload

        if (!username) return

        //search for users matching username value and exclude current user
        await User.find({ username: { "$regex": username, "$options": "i" }, _id: { "$ne": userID } })
            .select({ "email": 1, "username": 1, "profilePicId": 1 })
            .then(usersData => {

                user.emit("receive-searched-users", usersData)

            }).catch(err => new Error(err))
    })

    user.on("update-pro-pic", async payload => {

        const proPicFile = payload.newProPic
        const profilePicId = payload.newProPicID
        const userID = payload.userID

        console.log(proPicFile)


        await User.findOneAndUpdate({ _id: userID }, { profilePicId }).then(async userData => {

            const oldProfilePicID = userData.profilePicId

            await User.find({ "_id": { $in: userData.friendList } }).then(async friendsData => {


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