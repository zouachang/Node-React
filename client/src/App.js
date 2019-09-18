import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: document.cookie,
      // cookie:"imei=866402041321572; AppVersion=71000026; PlatForm=android; ks-udid=931508a18c931bb2b66db943f8fa792f; mgspuser.provinceCode=; mgspuser.cityId=; location=MIGUC_HOME#98288cd5c139434ebd19ed17893d8349#1720a71b546b496e93c809fb17f60da2; UserInfo=1210064767|70D69C04B64F7C6393FB; ClientId=96038188-57b3-4854-a217-80bbc281cc5f; mgspuser.isLogin=1; mgspuser.userId=1210064767; mgspuser.token=70D69C04B64F7C6393FB; mgspuser.mobile=null; mgspuser.sex=0; mgspuser.isVip=0; ks-sessionid=931508a18c931bb2b66db943f8fa792f1568644573102",
      phone: "",
      mail: "",
      message: "",
      success: false
    };
    this.getUserId = this.getUserId.bind(this);
    this.verifyPhone = this.verifyPhone.bind(this);
    this.verifyMail = this.verifyMail.bind(this);
  }

  putDataToDB = (userId, phone, mail) => {
    axios.post('http://3.14.88.154:3001/api/putUser', {
      userId: userId,
      phone: phone,
      mail: mail,
    }).then(
      (res) => {
        this.setState({
          success: res.data.success,
          message: res.data.message
        });
      }
    );
  };

  getUserId = () => {
    const { cookie } = this.state;
    const cookieArray = cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const keyValue = cookieArray[i].split('=');
      if (keyValue.length === 2) {
        if (keyValue[0].trim() === "mgspuser.userId") {
          return keyValue[1];
        }
      }
    }
    return "";
  }

  verifyPhone = () => {
    const { phone } = this.state;
    if (phone !== "" && phone.length !== 8) {
      return true;
    }
    return false;
  }

  verifyMail = () => {
    const { mail } = this.state;
    const reg = new RegExp("^([a-zA-Z0-9\\_\\-\\.])+@([a-zA-Z0-9\\_\\-\\.])+(\\.([a-zA-Z0-9])+)+$","g");
    if (mail !== "" && !reg.test(mail)) {
      return true;
    }
    return false;
  }

  render() {
    const { phone, mail, message, success } = this.state;
    const validPhone = this.verifyPhone();
    const validMail = this.verifyMail();
    let userId = this.getUserId();
    let enableSummit = !success && !validPhone && !validMail && phone !== "" && mail !== "";
    return (
      <div className="App-Background">
        <div className="App-container">
          <div className="App-result">
          <Typography variant="h6" gutterBottom>
            {message}
          </Typography>
          </div>
          <div className="App-input">
            <TextField error = {validPhone} required fullWidth label="電話號碼" type="number" margin="normal" onChange={(e) => this.setState({ phone: e.target.value })}/>
          </div>
          <div className="App-input">
            <TextField error = {validMail} required fullWidth label="電郵地址" margin="normal" onChange={(e) => this.setState({ mail: e.target.value })}/>
          </div>
          <div className="App-button">
            <Button disabled={!enableSummit} fullWidth variant="contained" color="primary" onClick={() => this.putDataToDB(userId, phone, mail)}>
              提交
          </Button>
          </div>
          <div className="App-text-area">
            <Typography variant="subtitle2" gutterBottom>
              *為保護用戶個人隱私，我們將對用戶錄入的個人信息进行保密處理；
          </Typography>
            <Typography variant="subtitle2" gutterBottom>
              *用戶務必保證參與活動的信息真實，若因用戶個人原因導致信息有誤、無法獲得活動獎品，後果將由用戶承擔；
          </Typography>
            <Typography variant="subtitle2" gutterBottom>
              *如有疑問，請聯繫:
          </Typography>
            <Typography variant="subtitle2" gutterBottom>
              international-biz@migu.cn
          </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default App;