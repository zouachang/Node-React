import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: document.cookie,
      phone: "",
      mail:"",
      message:""
    };
    this.getUserId = this.getUserId.bind(this);
    this.getCookieArray = this.getCookieArray.bind(this);
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
        if (keyValue[0] === "mgspuser.userId") {
          return keyValue[1];
        }
      }
    }
    return "";
  }

  getCookieArray = () => {
    const { cookie } = this.state;
    const cookieArray = cookie.split(';');
    return cookieArray.map(
      (c) => {
        const keyValue = c.split('=');
        if (keyValue.length === 2) {
          if (keyValue[0] === "mgspuser.userId") {
            window.alert("i");
          }
          if (keyValue[0] === "mgspuser.userld") {
            window.alert("L");
          }
          return (
            <div>
              <div key={keyValue[0]}>{keyValue[0]}</div>
              <div key={keyValue[1]}>{keyValue[1]}</div>
            </div>
          );
        }
        return <div key={c}>{c}</div>;
      });
  }

  render() {
    let userId = this.getUserId();
    return (
      <div>
        <div>{this.state.cookie}</div>
        <div>{this.getCookieArray()}</div>
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