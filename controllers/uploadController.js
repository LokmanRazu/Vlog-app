const User = require('../models/user')
const Profile = require('../models/profile')

exports.uploadprofilePics = async (req, res, next) => {
    if (req.file) {
        try {
            let profile = await Profile.findOne({ user: req.user._id })
            let profilePics = `/uploads/${req.file.filename}`
            if (profile) {

                await Profile.findOneAndUpdate({ user: req.user._id }, { $set: { profilePics } })
            } 
                await User.findOneAndUpdate({ _id: req.user._id }, { $set: { profilePics } })
                res.status(200).json({
                    profilePics
                })
        } catch {
            res.status(500).json({
                profilePics:req.user.profilePics
            })
        }
    }else{
        res.status(500).json({
            profilePics:req.user.profilePics
        })
    }
}