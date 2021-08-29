const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true
  }
});
const { User } = require("./models/User");

const { auth } = require("./middleware/auth");
const config = require("./config/key");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

io.on("connection", (socket) => {
  console.log("socket conneection event", socket.id, "client connected");

  //대화하기를 눌렀을 때, socket = null => socket = 방이름 으로 변경시켜줌.
  socket.on("joinRoom", data => {
    console.log('data', data);
    socket.join(data.room);

    //유저 채팅방에 이미 상대방과의 채팅내역이 존재하는지 확인 후 없으면 추가
    User.findOne({ _id: data.userId, chats: { $elemMatch: { receiverId: data.friendsId }}},
      (err, doc) => {
        if(err) console.log(err)
        
        if(doc == null) {
          //채팅방이 없을경우 DB에 채팅방 저장
          connect.then(db => {

          //대화 하기를 누른 본인
          User.findOneAndUpdate({ _id: data.userId, friends: { $elemMatch: { id: data.friendsId }}}, {
            "$set": {
              "friends.$.socket": data.room
            },
            "$push": {
              "chats": {
                "socketId": data.room,
                "receiverId": data.friendsId,
                "receiverName": data.friendsName
              }
            }
          },{ new: true },
            (err, doc) => {
              if(err) console.log(err)
              console.log(doc);
            }
          ),
          //대화 상대
          User.findOneAndUpdate({ _id: data.friendsId }, {
            "$push": {
              "chats": {
                "socketId": data.room,
                "receiverId": data.userId,
                "receiverName": data.userName
              }
            }
          },{ new: true },
          (err, doc) => {
            if(err) console.log(err)
            console.log(doc);
          }
        )    
      })
    }
  })
   
  })

  socket.on("Input Chat Message", msg => {
    connect.then(db => {
      //발신자 DB에 저장
      User.findOneAndUpdate({_id: msg.userId, chats: {$elemMatch: {socketId: msg.socketId}}},{
        "$push": {
          "chats.$.chat": {
            "senderId": msg.userId,
            "senderName": msg.userName,
            "message": msg.chatMessage,
            "time": msg.nowTime,
            "type": msg.type,
            "read": false
          }
            }},{ new: true },
            (err, doc) => {
                if(err) console.log(err)
            }
      ),
      //수신자 DB에 저장
      User.findOneAndUpdate({_id: msg.receiverId, chats: {$elemMatch: {socketId: msg.socketId}}},{
        "$push": {
          "chats.$.chat": {
            "senderId": msg.userId,
            "senderName": msg.userName,
            "message": msg.chatMessage,
            "time": msg.nowTime,
            "type": msg.type,
            "read": false
          }
            }},{ new: true },
            (err, doc) => {
                if(err) console.log(err)
            }
      );   
    }),

    setTimeout( () => {
    User.findOne({_id: msg.userId, chats: {$elemMatch: {socketId: msg.socketId}}},{
      "_id": false,
      "chats": {
          $elemMatch:{
              "socketId": msg.socketId
          }
        }
      })
      .exec((err, doc) => {
        
        let ChatList = doc.chats[0].chat;
        let lastChat;
        if(ChatList.length < 1){
          lastChat = ChatList[0]
        } else {
          lastChat = ChatList[ChatList.length - 1];
          console.log(lastChat);
        }
        

          if (err) console.log(err);
          return io.emit("Output Chat Message", lastChat)
          
      });
    }, 10)
  })
})

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});