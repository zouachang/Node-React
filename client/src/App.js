import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: document.cookie,
      // cookie:"imei=866402041321572; AppVersion=71000026; PlatForm=android; ks-udid=931508a18c931bb2b66db943f8fa792f; mgspuser.provinceCode=; mgspuser.cityId=; location=MIGUC_HOME#98288cd5c139434ebd19ed17893d8349#1720a71b546b496e93c809fb17f60da2; UserInfo=1210064767|70D69C04B64F7C6393FB; ClientId=96038188-57b3-4854-a217-80bbc281cc5f; mgspuser.isLogin=1; mgspuser.userId=1210064767; mgspuser.token=70D69C04B64F7C6393FB; mgspuser.mobile=null; mgspuser.sex=0; mgspuser.isVip=0; ks-sessionid=931508a18c931bb2b66db943f8fa792f1568644573102",
      phone: "",
      mail:"",
      message:""
    };
    this.getUserId = this.getUserId.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  putDataToDB = (userId, phone, mail) => {
    axios.post('http://3.14.88.154:3001/api/putUser', {
      userId: userId,
      phone: phone,
      mail: mail,
    }).then(
      (res) => {
        this.setState({message:res.data.message});
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

  render() {
    let userId = this.getUserId();
    return (
      <div>
        <div style={{ padding: '10px' }}>
          <input
            type="number  "
            onChange={(e) => this.setState({ phone: e.target.value })}
            placeholder="手机号码"
            style={{ width: '200px' }}
          />
          <input
            type="text"
            onChange={(e) => this.setState({ mail: e.target.value })}
            placeholder="电邮"
            style={{ width: '200px' }}
          />
          <div>{this.state.message}</div>
          <button onClick={() => this.putDataToDB(userId,this.state.phone,this.state.mail)}>
            ADD
          </button>
        </div>
      </div>
    );
  }
}

export default App;