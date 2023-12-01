const express = require("express");
const { userSignUp, userLogin, getAllUsers } = require('../controllers/user-controller');
const { SetUserAvatar } = require("../controllers/avatar-controller");

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', userLogin);
router.post('/setavatar/:id', SetUserAvatar);
router.get('/getAllusers/:id', getAllUsers);

module.exports = router;