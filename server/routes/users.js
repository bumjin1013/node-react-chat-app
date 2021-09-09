const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

const multer = require("multer");
const fs = require("fs");

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

//유저 정보 수정
router.post("/changeinfo", auth, (req, res) => {

    User.findOneAndUpdate({ _id: req.user._id },{
        "$set": {
            "name": req.body.name
    }},{ new: true },
    (err, doc) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).send({ success: true, doc })
    })
})
//친구 검색
router.post("/search", auth, (req, res) => {
    
    User.find({ name: req.body.friendsName })
    .exec((err, search) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, search })
    });
})

//친구 목록 불러오기
router.get("/getfriends", auth, (req, res) => {
    User.findOne({ _id: req.user._id })
        .exec((err, doc) => {
            let friendsList = doc.friends
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, friendsList })
        });
})

//친구 추가
router.post("/addfriends", auth, (req, res) => {

    User.findOneAndUpdate({ _id: req.user._id }, {
        "$push": {
            "friends": {
                "name": req.body.name,
                "id": req.body._id
            }
        }
    },{ new: true },
    (err, doc) => {
        //추가한 친구의 정보만 프론트로 전달 후 친구목록 배열에 concat
        let friends = doc.friends[doc.friends.length-1]
        
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).send({ success: true, friends })
    })
})

//친구 삭제
router.post("/deletefriends", auth, (req, res) => {
    
    User.findOneAndUpdate({ _id: req.user._id },{
        "$pull": {
            "friends": {
                "id": req.body.friendsId
    }}},{ new: true },
    (err, friendsList) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).send({ success: true, friendsList })
    })
})

//채팅 목록 불러오기
router.get("/getchatlist", auth, (req, res) => {
    User.findOne({ _id: req.user._id })
        .exec((err, doc) => {
            let chatList = doc.chats
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, chatList })
        });
})

//채팅 내역 불러오기
router.get("/getchats", auth, (req, res) => {
 
    User.findOne({ _id: req.user._id, chats: {$elemMatch: {socketId: req.query.socketId}}},{
        "_id": false,
        "chats": {
            $elemMatch:{
                "socketId": req.query.socketId
            }
        }
    })
    .exec((err, doc) => {
        if(doc){
        let chat = doc.chats[0].chat //chat 내용만 전달 (senderId, senderName, message, time, type)
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ chat })
        } else {
            null
        }
    });
})

//채팅창에 있을 시 메시지 읽음처리
router.post("/readmessage", auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { "chats.$[elem].chat.$[].read" : true } },
        {arrayFilters: [ { "elem.receiverId": req.body.receiverId } ],multi:true},
        (err, doc) => {
            let chatList = doc.chats
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).send({ success: true, chatList })
        })
})

//채팅방 삭제(나가기)
router.post("/outchatroom", auth, (req, res) => {

    User.findOneAndUpdate({ _id: req.user._id },{
        "$pull": {
            "chats": {
                "receiverId": req.body.receiverId
    }}},{ new: true },
    (err, doc) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).send({ success: true, doc })
    })
})

//파일 보내기


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadfiles", auth ,(req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, url: res.req.file.path });
  })
});


module.exports = router;
