import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // cookie: document.cookie,
      cookie: "a=b;c=d;userId=123;e=f",
      phone: "",
      mail:""
    };
    this.getUserId = this.getUserId.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  putDataToDB = (userId, phone, mail) => {
    axios.post('http://localhost:3001/api/putUser', {
      userId: userId,
      phone: phone,
      mail: mail,
    }).then(
      (res) => {
        let a = res.data;
      }
      );
  };

  getUserId = () => {
    const { cookie } = this.state;
    const cookieArray = cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const keyValue = cookieArray[i].split('=');
      if (keyValue.length === 2) {
        if (keyValue[0] === "userId") {
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
            type="text"
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
          <button onClick={() => this.putDataToDB(userId,this.state.phone,this.state.mail)}>
            ADD
          </button>
        </div>
      </div>
    );
  }
}

export default App;