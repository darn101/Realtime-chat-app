const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');

const userSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const IsExist = await User.findOne({ username: req.body.username });
        if (IsExist) {
            return res.status(201).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        delete user.password;
        return res.status(200).json({ message: user });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

const userLogin = async (req, res) => {
    try {
        const { firstvalue, password } = req.body;
        const UserMatch = await User.findOne({

            $or: [
                { username: firstvalue },
                { email: firstvalue },
            ]

        })
        console.log(UserMatch);

        if (!UserMatch) {
            console.log('hi');
            return res.json({ message: "Incorrect email or password", status: false });

        }
        const IsPasswordMatch = await bcrypt.compare(password, UserMatch.password);
        console.log(IsPasswordMatch);
        if (!IsPasswordMatch) {
            return res.json({ message: "Incorrect email or password", status: false });
        }
        delete UserMatch.password;
        return res.json({ status: true, message: UserMatch });
    }
    catch (err) {
        return res.json({ message: err.message, status: false });
    }

}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select(['_id', 'username', 'email', 'avatarImage']);
        return res.json(users);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
}

module.exports = {
    userSignUp, userLogin, getAllUsers
}