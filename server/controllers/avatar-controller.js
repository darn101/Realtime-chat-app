const User = require('../models/UserSchema')

const SetUserAvatar = async (req, res) => {
    try {
        const { id } = req.params;
        const { avatarImage } = req.body;
        // console.log(avatarImage);
        const user = await User.findByIdAndUpdate(
            id,
            {
                isAvatarImageSet: true,
                avatarImage: avatarImage
            }
        )
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    SetUserAvatar
}