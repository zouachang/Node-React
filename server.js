const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const User = require('./user');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb://zouachang:Moodys123@3.14.88.154:27017/activity';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create method
// this method adds new data in our database
router.post('/putUser', (req, res) => {
  let user = new User();
  const { userId, phone, mail } = req.body;
  console.log(userId);
  user.userId = userId;
  user.phone = phone;
  user.mail = mail;
  User.find({userId : user.userId},(err, u) => {
    if (err) return res.json({ success: false, message: "提交失败，请稍后再试或联系客服人员", err: err});
    if (u.length) return res.json({ success: false, message: "您已参加过此活动" });
    user.save((err) => {
      if (err) return res.json({ success: false, message: "提交失败，请稍后再试或联系客服人员", err: err});
      User.countDocuments({}, function (err, c) {
        if (err) return res.json({ success: true, message: "提交成功，获奖情况将以电邮或电话通知您", err: err });
        console.log('Count is ' + c);
        return res.json({ success: true, message: `提交成功，您的排名是${c},获奖情况将以电邮或电话通知您` });
      });
    });
  });
});

router.get('/getCount', (req, res) => {
  Data.countDocuments({}, function (err, c) {
    console.log('Count is ' + c);
    return res.json({ success: true, count: c });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));