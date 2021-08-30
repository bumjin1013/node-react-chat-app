# Chat App 

## Tech Stack
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/></a> 
<img src="https://img.shields.io/badge/Antd-0170FE?style=flat-square&logo=antDesign&logoColor=black"/></a> 
<img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=Express&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/socket.io-000000?style=flat-square&logo=socket.io&logoColor=white"/></a> 

 -----------

 ## Usage
 <br/>

1. To use MongoDB Atlas, make dev.js file inside config folder.
 If you are not registered, sign up https://www.mongodb.com/ and create Database.


2. Put mongoDB info into dev.js file

 + sample
``` Javascript
module.exports = {
    mongoURI: 'mongodb+srv://<Your Database Acess ID>:<PASSWORD>@beomjin.8iply.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}
```

3. Type "npm install" inside the root directory ( Download Server Dependencies )

4.  Type "npm install" inside the client directory ( Download Front-end Dependencies )

5. Type "npm run dev" inside the root directory, then you can use this Chat App

--------

## Structure
### client
```bash
client
   ├── ...
   ├── src
  ...   ├─ _actions
        │       ├─ chat_actions.js
        │       ├─ friends_actions.js
        │       ├─ user_actions.js
        │       └─ types.js
        │
        ├─ _retucers
        │       ├─ chat-reducer.js
        │       ├─ friends_reducer.js
        │       ├─ user_reducer.js
        │       └─ index.js
        │
        ├─ components
      ...       ├─ views
              ...     ├─ ...
                      ├─ ChatPage
                      │    ├─ Section
                      │    │     └─ ChatCard.js
                      │    └─ ChatPage.js   
                      ├─ MainPage
                     ...    ├─ Section
                            │     ├─ ChatList.js  
                            │     ├─ FriendsList.js         
                            │     └─ SearchFriends.js 
                            └─ MainPage.js
```
### server
```bash
server
   ├── config
   │     ├─ dev.js
   │     ├─ key.js
   │     └─ prod.js
   ├── middleware
   │     └─ auth.js
   ├── models 
   │     └─ User.js
   ├── routes 
   │     └─ users.js
   ├──index.js
  ...
```
-----
 ## Schema

```Javascript
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    },
    friends: [{
        name: { type: String },
        id: { type: String },
        socket: { type: String, default: null}
    }],
    chats: [{
        socketId: { type: String },
        receiverId: { type: String },
        receiverName: { type: String },
        chat: [{ 
            senderId: { type: String },
            senderName: { type: String },
            message: { type: String },
            time: { type: String },
            type: { type: String },
            read: { type: Boolean }
         }],
    }]
```
------
First, click login button and sign up
- LandingPage

  <img src='image/스크린샷 2021-08-30 오후 10.33.31.png' width="300">

After Login, you can see the main page
- MainPage

  <img src='image/스크린샷 2021-08-30 오후 10.34.41.png' width="300">
   
   From the left of the tab [freinds list], [chat room], [search friends], [etc (log out)] 
   
   you can serach user exists in data base with user's name

  <img src ='image/스크린샷 2021-08-30 오후 10.50.30.png' width="300">
  
  if you click add button, the user2 is added in friends list
  
  and you can delete friends to click delete button
  
  <img src ='image/스크린샷 2021-08-30 오후 10.55.42.png' width="300">
  
