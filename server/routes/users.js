const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/search", auth, (req, res) => {
    console.log(req.body.friendsName)
    User.find({ name: req.body.friendsName })
    .exec((err, search) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, search })
    });
})

router.get("/getfriends", auth, (req, res) => {
    User.findOne({ _id: req.user._id })
        .exec((err, doc) => {
            let friendsList = doc.friends
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, friendsList })
        });
})

router.post("/addfriends", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, {
        "$push": {
            "friends": {
                "name": req.body.name,
                "email": req.body.email
            }
        }
    },{ new: true },
    (err, doc) => {
        let friends = doc.friends[doc.friends.length-1]
        console.log(friends);
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).send({ success: true, friends })
    })
})


router.get("/deletefriends", auth, (req, res) => {
    User.find({ _id: req.user._id },{
        "pull": {
            "friends.$.email": req.body.email
    }}),
    (err, friendsList) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).send({ success: true, friendsList })
    }
})





module.exports = router;
