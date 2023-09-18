const mongoose = require('mongoose');


const UserProfileSchema = mongoose.Schema({

    prompt: {
        type: Array
    },
    interest: {
        type: Array
    },
    socialprofile: {
        type: Array
    },
    followers: {
        type: Array,
        default: []
    },
    followins: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    prompt: {
        type: Array,
    },
    interest: {
        type: Array
    },
    socialprofile: {
        type: Array
    },
    relationships: {
        type: Number,
        enum:[1,2,3]
    }

})

const Profile = mongoose.model('Profile', UserProfileSchema);

module.exports = Profile;