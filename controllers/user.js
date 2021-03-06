// first we import our dependencies…
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserGroup = require('../models/group');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('../config/nodemailer');
const config = require('../config/database');
// const passport = require('passport');
// const localStrategy = require('passport-local');
// const passportlocalMongoose = require('passport-local-mongoose');

// and create our instances

router.post('/resendEmail', function (req, res) {
    if (req.body.email && req.body.accountkey) {
        nodemailer.sendNewUserRegistration(req.headers.host, req.body.email, req.body.accountkey, function (err, info) {
            if (err) res.json({ success: false, msg: err });
            else res.json({ success: true, msg: 'Email sent kindly check email to setup Password'});
        });
    }
});
router.post('/register', function (req, res) {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        accountkey: req.body.accountkey,
        isActive: false,
        isEmailVerified: false,
        role: req.body.role,
        agent: req.body.agent,
        access: req.body.access,
        agentname: req.body.agentname
    });

    User.saveUser(newUser, function (err, user) {
        if (err) {
            return res.json({ success: false, msg: 'User not registered. Due to:\n' + err });
        }

        nodemailer.sendNewUserRegistration(req.headers.host, user.email, user.accountkey, function (err, info) {
            if (err) res.json({ success: false, msg: err });
            else res.json({ success: true, msg: 'Email sent: ' + info.response });
        });
    });
});
router.post('/changePassword', function (req, res) {
    var email = req.body.email;
    var oldpassword = req.body.oldpassword;
    var newpassword = req.body.newpassword;
    var isLink = req.body.link;

    User.getUserByEmail(email, function (err, user) {
        if (err) return res.json({ success: false, msg: err });
        if (!user) {
            return res.json({ success: false, msg: "Invalid code." });
        }

        User.comparePassword(oldpassword, user.password, function (err, isMatch) {
            if (err) return res.json({ success: false, msg: err });
            if (isMatch) {
                if (isLink) {
                    user.isActive = true;
                    user.isEmailVerified = true;
                }
                user.password = newpassword;
                User.saveUser(user, function (err, user) {
                    if (err) return res.json({ success: false, msg: err });
                    res.json({ success: true, msg: 'Account activated.' });
                });
            } else {
                return res.json({ success: false, msg: "Activation denied." });
            }
        });

    });
});
router.post('/forgotPassword', function (req, res) {
    var email = req.body.email;
    var token = req.body.token;
    var host = req.headers.host;

    User.getUserByEmail(email, function (err, user) {
        if (err) return res.json({ success: false, msg: err });
        if (!user) {
            return res.json({ success: false, msg: "No account with that email address exists." });
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function (err) {
            if (err) return res.json({ success: false, msg: err });
            nodemailer.sendPasswordReset(host, user.email, token, function (err, info) {
                if (err) return res.json({ success: false, msg: err });
                return res.json({ success: true, msg: 'Email sent: ' + info.response });
            });
        });

    });
});
router.post('/resetPassword/:token', function (req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (err) return res.json({ success: false, msg: err });
        if (!user) {
            return res.json({ success: false, msg: 'Password reset token is invalid or has expired.' });
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        User.saveUser(user, function (err, user) {
            if (err) return res.json({ success: false, msg: err });
            nodemailer.sendPasswordChanged(user.email, function (err, info) {
                if (err) return res.json({ success: false, msg: err });
                res.json({ success: true, msg: 'Password changed.' });
            });
        });
    });
});

router.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.getUserByEmail(email, function (err, user) {
        if (err) return res.json({ success: false, msg: err });
        if (!user) {
            return res.json({ success: false, msg: "User not found." });
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                var token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 600000 });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        agent: user.agent,
                        agentname: user.agentname,
                        accountkey: user.accountkey,
                        active: user.isActive,
                        access: user.access
                    }
                });
            }
            else {
                res.json({ success: false, msg: "Password not match." });
            }
        });
    });
});

router.get('/read', (req, res) => {
    User.find((err, user) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: user });
    }).sort({ _id: -1 });
});
router.get('/readall/:skip', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: users });
    }).sort({ _id: -1 }).skip(parseInt(req.params.skip)).limit(10);
});
router.get('/search/:searchstring', (req, res) => {
    User.find({ name: { $regex: req.params.searchstring, $options: "i" } }, (error, namesearch) => {
        if (error) return res.json({ success: false, error: error });
        return res.json({ success: true, data: namesearch });
    });
});
router.get('/edit/:editkey', (req, res) => {
    const editkey = req.params.editkey;
    User.findById({ _id: editkey }, (error, users) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true, data: users });
    });
});
router.put('/update/:editKey', (req, res) => {
    const { editKey } = req.params;
    if (!editKey) {
        return res.json({ success: false, error: 'No hotel id provided' });
    }
    User.findById(editKey, (error, updateUser) => {
        var oldEmail = updateUser.email;
        if (error) return res.json({ success: false, error });
        const { name, email, role, agent, agentname, access } = req.body;
        updateUser.name = name;
        updateUser.email = email;
        updateUser.role = role;
        updateUser.agent = agent;
        updateUser.agentname = agentname;
        updateUser.access = access;
        updateUser.save(error => {
            if (error) return res.json({ success: false, error });
            if (!updateUser.isEmailVerified && updateUser.email !== oldEmail) {
                nodemailer.sendNewUserRegistration(req.headers.host, updateUser.email, updateUser.accountkey, function (err, info) {
                    if (err) return res.json({ success: false, msg: error });
                    return res.json({ success: true, msg: "Account updated and email verification sent to " + updateUser.email + "." });
                });
            } else {
                return res.json({ success: true, msg: "Account updated successfully." });
            }
        });
    });
});
router.get('/getkey/:accountkey', (req, res) => {
    User.findOne({ accountkey: req.params.accountkey }, (error, userload) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true, data: userload });
    });
});
module.exports = router;