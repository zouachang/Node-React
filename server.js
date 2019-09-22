#!/usr/bin/env node
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = 'mongodb://zouachang:Moodys123@3.14.88.154:27017/activity';
mongoose.connect(dbRoute, { useNewUrlParser: true });
autoIncrement.initialize(mongoose.connection);
var userSchema = new Schema({
  userId: String,
  phone: String,
  mail: String
},
{ timestamps: true });
 
userSchema.plugin(autoIncrement.plugin, {model: 'User',startAt: 1});
let User = mongoose.connection.model('User', userSchema);

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// router.get('/getData', (req, res) => {
//   Data.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

// router.post('/updateData', (req, res) => {
//   const { id, update } = req.body;
//   Data.findByIdAndUpdate(id, update, (err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// router.delete('/deleteData', (req, res) => {
//   const { id } = req.body;
//   Data.findByIdAndRemove(id, (err) => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

router.post('/putUser', (req, res) => {
  let user = new User();
  const { userId, phone, mail } = req.body;
  if(!userId) {
    return res.json({ success: false, message: "獲取用戶信息失敗，請聯繫客服人員處理" });
  }
  user.userId = userId;
  user.phone = phone;
  user.mail = mail;
  User.find({userId : user.userId},(err, u) => {
    if (err) return res.json({ success: false, message: "提交失败，请稍后再试或联系客服人员", err: err});
    if (u.length) return res.json({ success: false, message: "閣下已参加过此活动" });
    user.save((err) => {
      if (err) return res.json({ success: false, message: "提交失败，请稍后再试或联系客服人员", err: err});
      return res.json({ success: true, message: `提交成功，閣下是第${user._id}位參與用戶,获奖情况後續将以电邮或电话通知` });
    });
  });
});

router.get('/getUser', (req, res) => {
  User.find({}, '_id userId phone mail', (err, user) => {
    if (err) return res.json({ success: false, error: err });
    User.countDocuments({}, function (err, c) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, user: user, count: c });
    });
  });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));