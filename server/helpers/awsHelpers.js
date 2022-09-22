const { s3 } = require("../server.js")

const getObjectUrl = async getObjectUrlParams => await s3.getSignedUrlPromise("getObject", getObjectUrlParams).catch(err => console.error(err))
const uploadImage = async uploadNewProPicParams => await s3.putObject(uploadNewProPicParams).promise().catch(err => console.error(err))
const deleteImage = async deletePrevPicParams => await s3.deleteObject(deletePrevPicParams).promise().catch(err => console.error(err))

module.exports = { getObjectUrl, uploadImage, deleteImage }